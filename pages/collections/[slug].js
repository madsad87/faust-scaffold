import Layout from "../../components/shop/Layout";
import ProductCard from "../../components/shop/ProductCard";
import { MotifOlD } from "../../components/shop/BrandMarks";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from "../../lib/catalog";
import styles from "../../styles/shop/collection.module.css";

export default function CollectionPage({ category, products }) {
  if (!category) {
    return (
      <Layout>
        <section className={styles.empty}>Collection not found.</section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className={styles.hero}>
        <img src={category.image} alt={category.name} />
        <div className={styles.content}>
          <MotifOlD />
          <h1>{category.name}</h1>
          <p>{category.tagline}</p>
        </div>
      </section>

      <section className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: categories.map((category) => ({ params: { slug: category.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      category: getCategoryBySlug(params.slug) || null,
      products: getProductsByCategory(params.slug),
    },
  };
}
