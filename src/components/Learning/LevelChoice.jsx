import { useNavigate } from "react-router-dom";
import styles from "./LevelChoice.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";

export default function LevelChoice() {
  const levels = [
    {
      id: "beginner",
      title: "Beginner",
      subtitle: "Start Your Journey",
      description:
        "Perfect for those just starting to learn English. Build a strong foundation with basic vocabulary, grammar, and everyday conversations.",
      icon: "🌱",
      features: [
        "Basic vocabulary",
        "Essential grammar rules",
        "Simple conversations",
      ],
      duration: "5-10 days",
      lessons: "10 lessons",
      color: "green",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      subtitle: "Expand Your Skills",
      description:
        "Ready to take your English to the next level? Improve your fluency with strong grammar, good vocabulary, and real-world scenarios.",
      icon: "🚀",
      features: [
        "grammar structures",
        "Extended vocabulary",
        "real world conversations",
      ],
      duration: "10-20 days",
      lessons: "8 lessons",
      color: "blue",
    },
    {
      id: "advanced",
      title: "Advanced",
      subtitle: "Master the Language",
      description:
        "Achieve fluency and confidence in English. Master complex topics, advance grammer, and professional communication.",
      icon: "🎯",
      features: [
        "Complex sentence structures",
        "Academic & professional English",
        "Advanced writing skills",
        "advance grammer",
      ],
      duration: "1-2 months",
      lessons: "8 lessons",
      color: "purple",
    },
  ];

  const user = useSelector((store) => store.authorise);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateWorkSpace = (level) => {
    if (!user) {
      navigate("/login");
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "You must login before learning!",
          type: "error",
        })
      );
    } else {
      navigate(`/level/${level.title.toLowerCase()}`);
    }
  };

  return (
    <div className={styles.levelChoicePage}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Choose Your Learning Level</h1>
            <p className={styles.subtitle}>
              Select the level that best matches your current English skills.
              Don't worry - you can always change it later!
            </p>
          </div>

          <div className={styles.levelsGrid}>
            {levels.map((level) => (
              <div
                key={level.id}
                className={`${styles.levelCard} ${styles[level.color]}`}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.levelIcon}>{level.icon}</div>
                  <div className={styles.levelTitleSection}>
                    <h2 className={styles.levelTitle}>{level.title}</h2>
                    <span className={styles.levelSubtitle}>
                      {level.subtitle}
                    </span>
                  </div>
                </div>

                <p className={styles.levelDescription}>{level.description}</p>

                <div className={styles.levelStats}>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>⏱️</span>
                    <span className={styles.statText}>{level.duration}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>📚</span>
                    <span className={styles.statText}>{level.lessons}</span>
                  </div>
                </div>

                <div className={styles.features}>
                  <h4 className={styles.featuresTitle}>What you'll learn:</h4>
                  <ul className={styles.featuresList}>
                    {level.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`${styles.selectButton} ${
                    styles[level.color + "Button"]
                  }`}
                  onClick={() => handleNavigateWorkSpace(level)}
                >
                  Start {level.title} Level
                </button>
              </div>
            ))}
          </div>

          {/* <div className={styles.helpSection}>
            <div className={styles.helpCard}>
              <h3>Not sure which level to choose?</h3>
              <p>Take our quick assessment test to find the perfect starting point for your English learning journey.</p>
              <button className={styles.assessmentButton}>Take Assessment Test</button>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
