import Layout from "../../components/shop/Layout";
import { MonogramOD, MotifOlD } from "../../components/shop/BrandMarks";
import { getProductBySlug, products } from "../../lib/catalog";
import styles from "../../styles/shop/product.module.css";

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <Layout>
        <section className={styles.empty}>Product not found.</section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className={styles.product}>
        <img src={product.image} alt={product.name} />
        <div className={styles.content}>
          <MonogramOD />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className={styles.sizeGuide}>{product.sizeGuide}</p>
          <div className={styles.purchaseRow}>
            <strong>{product.price}</strong>
            <button type="button">Add to cart</button>
          </div>
          <MotifOlD className={styles.watermark} />
        </div>
      </section>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      product: getProductBySlug(params.slug) || null,
    },
  };
}
