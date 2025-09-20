// import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check } from "lucide-react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/hero/hero.png";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <div className={styles.badge}>
              🎉 Completely Free
            </div>

            <h1 className={styles.title}>
              Learn English Simply
              <br />& Effectively
            </h1>
            <p className={styles.subtitle}>
              Start your English learning journey today with our simple,
              structured lessons. Practice vocabulary, grammar, and reading
              comprehension at your own pace.
            </p>

            <div className={styles.cta}>
              <button size="lg" className={styles.primaryBtn}>
                Start Learning Now
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <Check className={styles.featureIcon} />
                <span>Always free</span>
              </div>
              <div className={styles.feature}>
                <Check className={styles.featureIcon} />
                <span>No registration required</span>
              </div>
              <div className={styles.feature}>
                <Check className={styles.featureIcon} />
                <span>Start immediately</span>
              </div>
            </div>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img src={heroImg} className={styles.heroImage} />
              <div className={styles.floatingCard}>
                <div className={styles.cardIcon}>📚</div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>100% Free</div>
                  <div className={styles.cardSubtitle}>Forever & Always</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
