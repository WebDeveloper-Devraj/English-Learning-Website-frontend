import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Mock data - replace with actual API calls in your MERN stack
  const user = useSelector((store) => store.authorise);
  const navigate = useNavigate();
  // console.log(user);

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch("http://localhost:5000/api/quiz");
      const result = await response.json();
      setQuizzes(result.quizzes);
    };
    fetchQuizzes();
  }, []);

  const calculateStats = (level) => {
    const levelQuizzes = quizzes.filter((quiz) => quiz.level === level);

    const completed = user.quizResults.filter((q) =>
      levelQuizzes.find((lq) => lq._id === q.quizId)
    );

    const total = levelQuizzes.length;
    const scores = completed.map((q) => q.score);
    const points = completed.map((q) => q.pointsEarned);

    // const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
    // const averageScore =
    //   scores.length > 0
    //     ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    //     : 0;

    const totalScore = scores.reduce((a, b) => a + b, 0);
    const totalPoints = points.reduce((a, b) => a + b, 0);

    return {
      completed: completed.length,
      total,
      // bestScore,
      // averageScore,
      totalScore,
      totalPoints,
    };
  };

  const calculateOverallStats = () => {
    const allScores = user.quizResults?.map((q) => q.score * 10) || [];
    // console.log(allScores * 10);

    const allPercetange = user.quizResults?.map(
      (q) => (q.score / q.totalQuestions) * 100
    );

    const averagePercetange =
      allPercetange.length > 0
        ? Number(
            (
              allPercetange.reduce((a, b) => a + b, 0) / allPercetange.length
            ).toFixed(2)
          )
        : 0;

    const totalScore = allScores.reduce((a, b) => a + b, 0);

    return {
      totalQuizzes: quizzes.length,
      attempted: allScores.length,
      totalScore,
      averagePercetange,
    };
  };

  const quizStats = {
    beginner: calculateStats("beginner"),
    intermediate: calculateStats("intermediate"),
    advanced: calculateStats("advanced"),
    overall: calculateOverallStats(),
  };

  // console.log("quizStats: ", quizStats);

  const getQuizLevelClasses = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return `${styles.badge} ${styles.badgeBeginner}`;
      case "intermediate":
        return `${styles.badge} ${styles.badgeIntermediate}`;
      case "advanced":
        return `${styles.badge} ${styles.badgeAdvanced}`;
      default:
        return styles.badge;
    }
  };

  const totalCompleted =
    quizStats.beginner.completed +
    quizStats.intermediate.completed +
    quizStats.advanced.completed;
  const totalQuizzes =
    quizStats.beginner.total +
    quizStats.intermediate.total +
    quizStats.advanced.total;
  const overallAverage = Math.round(
    (quizStats.beginner.averageScore * quizStats.beginner.completed +
      quizStats.intermediate.averageScore * quizStats.intermediate.completed +
      quizStats.advanced.averageScore * quizStats.advanced.completed) /
      totalCompleted
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              {user.username
                .split(" ") // split name by spaces
                .map((word) => word[0]) // take first letter of each word
                .join("") // join them together
                .toUpperCase()}
            </div>
            <div className={styles.headerText}>
              <h1>Welcome back, {user.username}!</h1>
              <p>Continue your English learning journey</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.pointsSection}>
              <span className={`${styles.icon} ${styles.trophy}`}>🏆</span>
              <span className={styles.pointsValue}>
                {quizStats.overall.totalScore}
              </span>
              <span className={styles.pointsLabel}>points</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
                <span className={styles.icon}>🎯</span>
              </div>
              <div className={styles.statText}>
                <h3>Quizzes Completed</h3>
                <p className={styles.value}>{quizStats.overall.attempted}</p>
                <p className={styles.subValue}>
                  {quizStats.overall.attempted}/{quizStats.overall.totalQuizzes}{" "}
                  total
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
                <span className={styles.icon}>📈</span>
              </div>
              <div className={styles.statText}>
                <h3>Average Score</h3>
                <p className={styles.value}>
                  {quizStats.overall.averagePercetange}%
                </p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
                <span className={styles.icon}>📅</span>
              </div>
              <div className={styles.statText}>
                <h3>Member Since</h3>
                <p className={styles.value}>
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Categories */}
        <div className={styles.quizSection}>
          <div className={styles.quizHeader}>
            <h2 className={styles.quizTitle}>
              <span className={styles.icon}>📚</span>
              Learning Categories
            </h2>
            <p className={styles.quizDescription}>
              Your progress across different difficulty levels
            </p>
          </div>
          <div className={styles.quizContent}>
            {Object.entries(quizStats).map(([level, stats]) => {
              if (level === "overall") return null;
              return (
                <div key={level} className={styles.quizLevel}>
                  <div className={styles.quizLevelHeader}>
                    <div className={styles.quizLevelLeft}>
                      <span className={getQuizLevelClasses(level)}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </span>
                      <span className={styles.completionText}>
                        {stats.completed}/{stats.total} completed
                      </span>
                    </div>
                    <button
                      className={styles.continueButton}
                      onClick={() => navigate(`/level/${level}`)}
                    >
                      <span className={styles.icon}>▶️</span>
                      Continue
                    </button>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${(stats.completed / stats.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className={styles.progressStats}>
                    <span>
                      Total Points:{" "}
                      <span style={{ color: "green" }}>
                        {stats.totalPoints} Points
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
