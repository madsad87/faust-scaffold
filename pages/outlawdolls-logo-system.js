import styles from "../styles/outlawdolls-logo-system.module.css";

const logoVariants = [
  {
    name: "Primary wordmark",
    className: styles.wordmark,
    content: "OutlawDolls",
    note: "High-fashion serif wordmark for hero placements and editorial layouts.",
  },
  {
    name: "Monogram",
    className: styles.monogram,
    content: "OD",
    note: "Compact signature for favicons, labels, and small-scale touchpoints.",
  },
  {
    name: "Stylized monogram",
    className: `${styles.monogram} ${styles.stylized}`,
    content: (
      <>
        <span>O</span>
        <span className={styles.divider}>l</span>
        <span>D</span>
      </>
    ),
    note: "Stylized OlD lockup with a thin divider to emphasize the mark's intentional structure.",
  },
];

export default function OutlawDollsLogoSystem() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>OutlawDolls</p>
        <h1>Monochrome logo system</h1>
        <p>
          Minimal, editorial, and slightly rebellious marks designed for a cool,
          confident feminine brand voice.
        </p>
      </header>

      <section className={styles.grid}>
        {logoVariants.map((variant) => (
          <article key={variant.name} className={styles.card}>
            <h2>{variant.name}</h2>
            <p>{variant.note}</p>

            <div className={styles.previewRow}>
              <div className={`${styles.preview} ${styles.light}`}>
                <div className={variant.className}>{variant.content}</div>
              </div>
              <div className={`${styles.preview} ${styles.dark}`}>
                <div className={variant.className}>{variant.content}</div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
