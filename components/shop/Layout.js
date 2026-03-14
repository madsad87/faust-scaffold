import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { MonogramOD, MotifOlD, PrimaryWordmark } from "./BrandMarks";
import styles from "../../styles/shop/layout.module.css";

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Head>
        <title>OutlawDolls — Monochrome Fashion Boutique</title>
        <meta
          name="description"
          content="Headless WooCommerce storefront for OutlawDolls. Editorial, monochrome, and fashion-forward essentials."
        />
        <link rel="icon" type="image/svg+xml" href="/favicon-od.svg" />
      </Head>

      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <MonogramOD className={styles.mobileMark} />
            <Link href="/" className={styles.brandLink}>
              <PrimaryWordmark />
            </Link>
            <nav className={styles.nav}>
              <Link href="/">Home</Link>
              <Link href="/collections/new-arrivals">Shop</Link>
              <Link href="/collections/night-edit">Night Edit</Link>
            </nav>
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => setIsCartOpen(true)}
            >
              Cart (2)
            </button>
          </div>
        </header>

        <main>{children}</main>

        <footer className={styles.footer}>
          <PrimaryWordmark />
          <p>
            Monochrome essentials for women who move like they own the room.
          </p>
          <div className={styles.footerMeta}>
            <MotifOlD />
            <span>© {new Date().getFullYear()} OutlawDolls</span>
          </div>
        </footer>
      </div>

      <aside
        className={`${styles.cartDrawer} ${isCartOpen ? styles.cartDrawerOpen : ""}`}
      >
        <div className={styles.drawerHeader}>
          <MonogramOD />
          <button type="button" onClick={() => setIsCartOpen(false)}>
            Close
          </button>
        </div>
        <ul>
          <li>
            <span>Obsidian Corset Top</span>
            <strong>$128</strong>
          </li>
          <li>
            <span>Void Slip Dress</span>
            <strong>$164</strong>
          </li>
        </ul>
        <div className={styles.drawerTotal}>
          <span>Subtotal</span>
          <strong>$292</strong>
        </div>
        <button type="button" className={styles.checkoutButton}>
          Checkout
        </button>
      </aside>
      {isCartOpen ? (
        <button
          type="button"
          aria-label="Close cart"
          className={styles.backdrop}
          onClick={() => setIsCartOpen(false)}
        />
      ) : null}
    </>
  );
}
