import { ArrowRight } from "lucide-react";
import styles from "./CTA.module.css";
import CTAImg from "../../assets/hero/CTA.png";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Ready to Start Learning English?</h2>
            <p className={styles.subtitle}>
              Begin your English learning journey today. It's completely free
              and you can start immediately.
            </p>

            <Link to="/level">
              <div className={styles.buttonWrapper}>
                <button size="lg" className={styles.button}>
                  Start Learning Now
                  <ArrowRight className={styles.buttonIcon} />
                </button>
              </div>
            </Link>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Always 100% free</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Start learning immediately</span>
              </div>
            </div>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img src={CTAImg} className={styles.ctaImage} />
              <div className={styles.floatingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>Always Free!</div>
                  <div className={styles.cardSubtitle}>
                    No hidden costs ever
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
