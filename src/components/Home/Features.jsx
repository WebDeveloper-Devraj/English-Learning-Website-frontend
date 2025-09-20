import { Book, Target, Clock, Trophy, Users, PenTool } from "lucide-react";
import styles from "./Features.module.css";

const Features = () => {
  const features = [
    {
      icon: Book,
      title: "Vocabulary Builder",
      description:
        "Learn new words with definitions, examples, and practice exercises",
      color: "#3b82f6",
    },
    {
      icon: Target,
      title: "Grammar Lessons",
      description:
        "Master English grammar with clear explanations and examples",
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
        "See your improvement with simple progress indicators and achievements",
      color: "#f59e0b",
    },
    {
      icon: Users,
      title: "Reading Practice",
      description:
        "Improve comprehension with engaging texts and comprehension questions",
      color: "#8b5cf6",
    },
    {
      icon: PenTool,
      title: "Writing Exercises",
      description:
        "Practice your writing skills with guided prompts and feedback",
      color: "#ef4444",
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose LearnEnglish?</h2>
          <p className={styles.subtitle}>
            Simple, effective, and completely free. Our platform provides
            everything you need to start learning English today without any
            barriers or costs.
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
