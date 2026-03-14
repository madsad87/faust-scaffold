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

## 3) Recommended Build Phases

### Phase 0 — Discovery & Constraints (1-2 weeks)

- Confirm business requirements: locales/currency, tax model, shipping model, payment gateways, promo/discount strategy.
- Confirm SEO requirements and faceted navigation behavior (indexable vs noindex filtered URLs).
- Decide auth model: guest checkout only, account optional, or account-first.
- Validate plugin stack in WordPress (WooCommerce + GraphQL plugins + payment/shipping extensions).

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

**Deliverables**

- End-to-end checkout in staging.
- Error taxonomy and user-facing recovery UX.
- Event instrumentation for checkout funnel.

### Phase 4 — Hardening, SEO, Analytics, Launch (1-2 weeks)

- SEO: structured data (Product, BreadcrumbList), canonical URLs, XML sitemaps for product routes.
- Analytics: GA4 + server-side events (view_item, add_to_cart, begin_checkout, purchase).
- Performance tuning: image optimization, fragment caching, route-level revalidation tuning.
- QA/UAT: cross-browser, mobile, payment edge cases, tax/shipping edge cases.

**Deliverables**

- Launch readiness checklist.
- Rollback plan.
- Post-launch monitoring dashboard.

## 4) Proposed Repository Changes (Implementation Direction)

- Add commerce-focused folders:
  - `components/commerce/`
  - `queries/commerce/`
  - `lib/commerce/` (mappers/session helpers)
  - `pages/shop/` and/or dynamic product/category routes
- Keep existing scaffold templates for editorial pages.
- Introduce a commerce layout shell that reuses global header/footer but adds minicart and shop navigation.

## 5) Integration Risks & Mitigations

- **Risk:** GraphQL plugin field gaps for advanced WooCommerce flows.
  - **Mitigation:** Hybrid strategy (GraphQL for reads + REST for operational writes where necessary).
- **Risk:** Session/cart consistency across SSR and client navigation.
  - **Mitigation:** Clear cart session strategy with server-trusted cart totals.
- **Risk:** Price/inventory staleness.
  - **Mitigation:** Revalidate aggressively on PDP/cart and always trust checkout-time server recalculation.
- **Risk:** SEO dilution from faceted URLs.
  - **Mitigation:** Strong canonical/noindex strategy for non-value filter permutations.

## 6) MVP Scope Recommendation

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

## 7) Immediate Next Steps (This Week)

1. Stand up WooCommerce + GraphQL plugin stack in a staging WordPress environment.
2. Validate the top 10 required frontend queries/mutations in GraphQL IDE.
3. Build a thin technical spike in this scaffold:
   - `/shop` route with product grid.
   - `/product/[slug]` route with title/price/add-to-cart stub.
4. Decide cart API strategy (GraphQL-only vs hybrid GraphQL/REST) before deeper UI build.
5. Finalize MVP definition and timeline with stakeholders.
