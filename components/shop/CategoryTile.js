import Link from "next/link";
import styles from "../../styles/shop/category-tile.module.css";

export default function CategoryTile({ category }) {
  return (
    <Link href={`/collections/${category.slug}`} className={styles.tile}>
      <img src={category.image} alt={category.name} />
      <div>
        <h3>{category.name}</h3>
        <p>{category.tagline}</p>
      </div>
    </Link>
  );
}
