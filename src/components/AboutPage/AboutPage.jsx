import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

export function AboutPage() {
  const features = [
    {
      icon: "📚",
      title: "Interactive Learning",
      description:
        "Engage with dynamic quizzes and exercises designed to make language learning fun and effective.",
    },
    {
      icon: "🎯",
      title: "Personalized Progress",
      description:
        "Track your learning journey with detailed progress reports.",
    },
    {
      icon: "🏆",
      title: "Gamified Experience",
      description: "Earn points, and compete with friends to stay motivated.",
    },
  ];

  const team = [
    {
      name: "Omkar Chalke",
      role: "Co-Founder & CEO",
      bio: "Former Google engineer with a passion for education technology.",
      avatar: "👨‍🎓",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      name: "Devraj Pujari",
      role: "Lead Developer",
      bio: "Full-stack developer specializing in AI and machine learning.",
      avatar: "👨‍💻",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      name: "Vedang Gawade",
      role: "UX Designer",
      bio: "Award-winning designer focused on creating intuitive learning experiences.",
      avatar: "👨‍🎨",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const technologies = [
    {
      icon: "📱",
      title: "Cross-Platform",
      description:
        "Seamless learning experience across web, and mobile devices with real-time synchronization.",
      color: "#8b5cf6",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. We never sell your information and respect your privacy.",
      color: "#f59e0b",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.headerInfo}>
                <h1>About LearnEnglish</h1>
                <p>Learn English the smart way</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>Join Us And Improve Learning</h2>
              <p className={styles.heroDescription}>
                Join us with our innovative learning platform designed to make
                fluency achievable for everyone.
              </p>
              <div className={styles.heroButtons}>
                <Link to="/contact" className={styles.heroButtonPrimary}>
                  <span className={styles.buttonIcon}>💬</span>
                  Get in Touch
                </Link>
                <Link to="/level" className={styles.heroButtonSecondary}>
                  <span className={styles.buttonIcon}>📚</span>
                  Start Learning
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>🌟</div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className={styles.missionSection}>
          <div className={styles.sectionCard}>
            <div className={styles.missionHeader}>
              <h2>Our Mission</h2>
              <p>To make English learning simple, fun, and effective</p>
            </div>
            <div className={styles.missionContent}>
              <div className={styles.missionText}>
                <div className={styles.missionParagraph}>
                  <p>
                    We aim to help learners improve their English skills through
                    interactive quizzes and engaging video lessons, so they can
                    build confidence and use English in everyday life.
                  </p>
                </div>
                <div className={styles.missionParagraph}>
                  <h2>Our Vision</h2>
                  <p>
                    Our Vision To become a trusted platform where anyone,
                    anywhere, can learn English easily and confidently, opening
                    doors to better education, career opportunities, and global
                    communication.
                  </p>
                </div>
                <div className={styles.missionHighlight}>
                  <span className={styles.heartIcon}>❤️</span>
                  <span>Made with passion for learning</span>
                </div>
              </div>
              <div className={styles.missionVisual}>
                <div className={styles.impactCard}>
                  <div className={styles.impactIcon}>🌍</div>
                  <h3>Global Impact</h3>
                  <p>
                    Connecting cultures and creating opportunities through
                    language education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.featuresSection}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Why Choose LearnEnglish?</h2>
              <p>Features designed to accelerate your learning journey</p>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Meet Our Team</h2>
              <p>The passionate people behind LanguageMaster</p>
            </div>
            <div className={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} className={styles.teamCard}>
                  <div
                    className={styles.teamAvatar}
                    style={{ background: member.background }}
                  >
                    <span className={styles.avatarEmoji}>{member.avatar}</span>
                  </div>
                  <div className={styles.teamInfo}>
                    <h3 className={styles.teamName}>{member.name}</h3>
                    <p className={styles.teamRole}>{member.role}</p>
                    <p className={styles.teamBio}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className={styles.technologySection}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2>Our Technology</h2>
            </div>
            <div className={styles.technologyGrid}>
              {technologies.map((tech, index) => (
                <div key={index} className={styles.technologyCard}>
                  <div className={styles.technologyIcon}>{tech.icon}</div>
                  <h3 className={styles.technologyTitle}>{tech.title}</h3>
                  <p className={styles.technologyDescription}>
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
              <p className={styles.ctaDescription}>
                Join many of learners who have already transformed their english
                skills with LearnEnglish.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/level" className={styles.ctaButtonPrimary}>
                  <span className={styles.buttonIcon}>📚</span>
                  Start Learning Now
                </Link>
                <Link to="/contact" className={styles.ctaButtonSecondary}>
                  <span className={styles.buttonIcon}>💬</span>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
