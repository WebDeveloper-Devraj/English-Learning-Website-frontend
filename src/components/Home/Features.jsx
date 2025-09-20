import { Book, Target, Clock, Trophy, Users, PenTool } from "lucide-react";
import styles from "./Features.module.css";

const Features = () => {
  const features = [
    
    {
      icon: Target,
      title: "Grammar Quizzes",
      description:
        "Master English grammar with Quizzes and  clear explanations",
      color: "#10b981",
    },
    {
      icon: Clock,
      title: "Self-Paced Learning",
      description:
        "Study whenever you want, as much or as little as you prefer",
      color: "#f59e0b",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description:
        "See your improvement with simple progress indicators and points",
      color: "#f59e0b",
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose LearnEnglish?</h2>
          <p className={styles.subtitle}>
            Engage with dynamic quizzes and exercises designed to make language learning fun and effective.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className={styles.card}>
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <IconComponent
                    className={styles.icon}
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
