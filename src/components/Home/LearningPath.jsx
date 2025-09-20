import { BookOpen, CheckCircle, Clock } from "lucide-react";
import styles from "./LearningPath.module.css";
import learningPathImg from "../../assets/hero/learningPath.png";

const LearningPath = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Step-by-Step Lessons",
      description:
        "Follow a clear learning path from basic to advanced English concepts.",
    },
    {
      icon: CheckCircle,
      title: "Comprehensive Content",
      description:
        "Everything you need to master English vocabulary, grammar, and reading.",
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description:
        "No time limits or pressure. Take as much time as you need to master each concept.",
    },
  ];

  return (
    <section className={styles.learningPath}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>Simple & Structured Learning Path</h2>

            <div className={styles.features}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className={styles.feature}>
                    <div className={styles.iconWrapper}>
                      <IconComponent className={styles.icon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.imageSection}>
            <img src={learningPathImg} className={styles.pathImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
