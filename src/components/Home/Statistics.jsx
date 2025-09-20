import styles from "./Statistics.module.css";

const Statistics = () => {
  const stats = [
    {
      value: "100%",
      label: "Free Forever",
    },
    {
      value: "1000+",
      label: "Vocabulary Words",
    },
    {
      value: "50+",
      label: "Grammar Topics",
    },
    {
      value: "∞",
      label: "Practice Time",
    },
  ];

  return (
    <section className={styles.statistics}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
