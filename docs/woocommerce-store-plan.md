# WooCommerce Front-End Store Implementation Plan

## 1) Current Scaffold Assessment

This scaffold already provides a strong base for a headless WordPress build:

- **Rendering model:** It uses Faust + Next.js with dynamic WordPress routing via `WordPressTemplate` and catch-all page support.
- **Data layer:** Apollo Client is already configured for GraphQL queries and fragments.
- **Shell structure:** Header, footer, and basic page templates are in place.
- **Content orientation today:** Current templates are editorial/content-focused, not product/catalog-focused.

## 2) Target Architecture for Commerce

### Front end (this repo)

- Next.js + Faust for SSR/ISR product pages and category pages.
- Apollo GraphQL client for catalog reads (products, categories, attributes, filters, related products).
- Cart/checkout state stored client-side (context + storage) and synchronized with WooCommerce session/cart endpoints.
- Incremental migration approach: keep existing WordPress content templates while introducing dedicated commerce routes/components.

### Back end (WordPress)

- WooCommerce as system of record for products, pricing, inventory, tax classes, shipping classes, orders.
- WPGraphQL + WooGraphQL (or equivalent WooCommerce GraphQL extension) for product and catalog querying.
- WooCommerce REST API as fallback for operational endpoints not fully covered by GraphQL in your selected plugin set.
- Webhooks for order lifecycle events and cache invalidation.

## 3) WPGraphQL-Specific Implementation Guidance

To keep this project aligned with GraphQL best practices in the WordPress ecosystem, treat the GraphQL schema as the primary contract and design the frontend around stable query shapes.

### Query strategy

- Prefer small, route-specific queries over a single large query.
- Use fragments for shared models (`ProductCardFields`, `MoneyFields`, `ImageFields`).
- Favor cursor-based pagination (`first/after`) for product archives instead of offset pagination.
- Request only fields needed for the specific UI state (PLP vs PDP vs minicart).

### Schema and plugin strategy

- Freeze a minimum plugin/version matrix for staging and production:
  - WooCommerce
  - WPGraphQL
  - WooCommerce GraphQL integration plugin
- Maintain a compatibility checklist whenever plugin upgrades are planned.
- Document any custom schema extensions (custom fields, resolvers, or mapping code) in this repo.

### Auth/session/cart strategy

- Separate concerns between:
  - **Public catalog reads** (cacheable where possible).
  - **Session/cart/checkout operations** (user/session scoped, never edge-cached).
- Ensure cart totals are server-authoritative on every cart-changing operation.
- Keep guest session continuity consistent across SSR and client transitions.

### Observability and resilience

- Add GraphQL error classification (network, auth/session, validation, upstream Woo).
- Log operation name, variables shape (redacted), and response timing.
- Add graceful UI fallback for partial data where safe (e.g., related products block).

## 4) Recommended Build Phases

### Phase 0 — Discovery & Constraints (1-2 weeks)

- Confirm business requirements: locales/currency, tax model, shipping model, payment gateways, promo/discount strategy.
- Confirm SEO requirements and faceted navigation behavior (indexable vs noindex filtered URLs).
- Decide auth model: guest checkout only, account optional, or account-first.
- Validate plugin stack in WordPress (WooCommerce + GraphQL plugins + payment/shipping extensions).
- Define schema contract for MVP operations before UI implementation starts.

**Deliverables**

- Data contract matrix (frontend screen -> WPGraphQL query/mutation).
- URL model and information architecture.
- MVP scope lock.

### Phase 1 — Data Foundation (1-2 weeks)

- Add typed GraphQL operations for:
  - Product list/plp.
  - Product detail/pdp.
  - Product categories/collections.
  - Product attributes and filters.
- Normalize image/price/inventory fields for predictable UI consumption.
- Define ISR revalidation rules per route type (home, category, product).
- Add a single service layer for GraphQL calls so route components stay presentation-focused.

**Deliverables**

- `queries/commerce/*` query set.
- Shared data mappers/adapters for product card and PDP models.
- Cache/revalidation policy doc.

### Phase 2 — Catalog UI (2-4 weeks)

- Build reusable components:
  - ProductCard, ProductGrid, Price, Rating, StockBadge.
  - FilterPanel, SortControl, Pagination/LoadMore.
  - Breadcrumbs and related/recommended products.
- Implement routes:
  - `/shop` (all products)
  - `/product-category/[slug]`
  - `/product/[slug]`
- Add loading, empty, and error states for each experience.
- Add route-level SEO metadata + product/category structured data.

**Deliverables**

- Fully navigable catalog and PDP.
- Responsive design system alignment.
- Core Web Vitals baseline report.

### Phase 3 — Cart & Checkout Integration (2-4 weeks)

- Implement cart lifecycle:
  - add/remove/update quantity
  - coupon apply/remove
  - shipping/tax estimate
- Integrate checkout with chosen payment gateways.
- Ensure guest checkout, address validation, order confirmation, and failure recovery flows.
- Validate tax/shipping/discount calculations against WooCommerce server values at each step.

**Deliverables**

- End-to-end checkout in staging.
- Error taxonomy and user-facing recovery UX.
- Event instrumentation for checkout funnel.

### Phase 4 — Hardening, SEO, Analytics, Launch (1-2 weeks)

- SEO: structured data (Product, BreadcrumbList), canonical URLs, XML sitemaps for product routes.
- Analytics: GA4 + server-side events (view_item, add_to_cart, begin_checkout, purchase).
- Performance tuning: image optimization, fragment caching, route-level revalidation tuning.
- QA/UAT: cross-browser, mobile, payment edge cases, tax/shipping edge cases.
- Add synthetic checks for critical routes (`/shop`, `/product/[slug]`, checkout success/failure states).

**Deliverables**

- Launch readiness checklist.
- Rollback plan.
- Post-launch monitoring dashboard.

## 5) Proposed Repository Changes (Implementation Direction)

- Add commerce-focused folders:
  - `components/commerce/`
  - `fragments/commerce/`
  - `queries/commerce/`
  - `lib/commerce/` (mappers/session helpers/graphql client wrappers)
  - `pages/product/[slug].js`
  - `pages/product-category/[slug].js`
  - `pages/shop/` and/or dynamic product/category routes
- Keep existing scaffold templates for editorial pages.
- Introduce a commerce layout shell that reuses global header/footer but adds minicart and shop navigation.

### Suggested initial file map

```bash
components/commerce/
  ProductCard.js
  ProductGrid.js
  Price.js
  CartDrawer.js
fragments/commerce/
  ProductCardFields.js
  MoneyFields.js
queries/commerce/
  GetShopProducts.js
  GetProductBySlug.js
  GetProductsByCategory.js
lib/commerce/
  adapters.js
  cart-session.js
  graphql-client.js
pages/
  shop/index.js
  product/[slug].js
  product-category/[slug].js
```

## 6) Integration Risks & Mitigations

- **Risk:** GraphQL plugin field gaps for advanced WooCommerce flows.
  - **Mitigation:** Hybrid strategy (GraphQL for reads + REST for operational writes where necessary).
- **Risk:** Session/cart consistency across SSR and client navigation.
  - **Mitigation:** Clear cart session strategy with server-trusted cart totals.
- **Risk:** Price/inventory staleness.
  - **Mitigation:** Revalidate aggressively on PDP/cart and always trust checkout-time server recalculation.
- **Risk:** SEO dilution from faceted URLs.
  - **Mitigation:** Strong canonical/noindex strategy for non-value filter permutations.
- **Risk:** Schema drift after plugin updates.
  - **Mitigation:** Add scheduled schema diff checks in CI and gate releases on major schema changes.

## 7) MVP Scope Recommendation

Start with:

- Product listing and category browsing.
- Product details with variant selection.
- Guest cart and checkout with one payment method.
- Basic coupons and shipping calculation.
- Core analytics and SEO metadata.

Defer to phase 2+:

- Multi-currency.
- Loyalty/wishlist.
- Personalized recommendations.
- Complex bundling/subscriptions (unless business-critical).

## 8) Immediate Next Steps (This Week)

1. Stand up WooCommerce + GraphQL plugin stack in a staging WordPress environment.
2. Validate the top 10 required frontend queries/mutations in GraphQL IDE.
3. Build a thin technical spike in this scaffold:
   - `/shop` route with product grid.
   - `/product/[slug]` route with title/price/add-to-cart stub.
4. Decide cart API strategy (GraphQL-only vs hybrid GraphQL/REST) before deeper UI build.
5. Finalize MVP definition and timeline with stakeholders.

## 9) Decision Log Template (Use During Implementation)

Use this lightweight format for architectural decisions made during the build:

- **Decision:**
- **Date:**
- **Context:**
- **Chosen option:**
- **Alternatives considered:**
- **Impact/risk:**

Keeping this log current prevents repeated debate when scaling past MVP.

## References

- WP Engine Builders: Everything You Need to Know About WPGraphQL: https://wpengine.com/builders/everything-you-need-to-know-about-wpgraphql/
