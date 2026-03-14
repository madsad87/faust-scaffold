import Link from "next/link";
import styles from "../../styles/shop/product-card.module.css";

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <Link href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className={styles.content}>
        <Link href={`/product/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <div className={styles.meta}>
          <span>{product.price}</span>
          <Link href={`/product/${product.slug}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
