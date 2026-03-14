import Link from "next/link";
import CategoryTile from "../components/shop/CategoryTile";
import Layout from "../components/shop/Layout";
import ProductCard from "../components/shop/ProductCard";
import { MotifOlD } from "../components/shop/BrandMarks";
import { categories, featuredProducts } from "../lib/catalog";
import styles from "../styles/shop/home.module.css";

export default function HomePage() {
  return (
    <Layout>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80"
          alt="Editorial fashion portrait"
        />
        <div className={styles.heroOverlay}>
          <MotifOlD className={styles.heroMotif} />
          <h1>Monochrome power dressing for the cool girl era.</h1>
          <p>
            OutlawDolls is a headless boutique built on WooCommerce: precise
            tailoring, directional shapes, and confident pieces for after-dark
            momentum.
          </p>
          <Link href="/collections/new-arrivals">Shop New Arrivals</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>Featured Categories</h2>
          <p>Editorial capsules with sharp attitude and elegant restraint.</p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>New Arrivals</h2>
          <p>Fresh drops designed for elevated rebellion.</p>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
