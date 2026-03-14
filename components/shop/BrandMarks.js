import styles from "../../styles/shop/brand-marks.module.css";

export function PrimaryWordmark({ className = "" }) {
  return (
    <span className={`${styles.wordmark} ${className}`.trim()}>
      OutlawDolls
    </span>
  );
}

export function MonogramOD({ className = "" }) {
  return <span className={`${styles.monogram} ${className}`.trim()}>OD</span>;
}

export function MotifOlD({ className = "" }) {
  return (
    <span
      className={`${styles.motif} ${className}`.trim()}
      aria-label="OlD brand motif"
    >
      <span>O</span>
      <span className={styles.divider}>l</span>
      <span>D</span>
    </span>
  );
}
