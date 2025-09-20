import { Link } from "react-router-dom";
import styles from "./Quiz.module.css";
import { quizActions } from "../../store/slices/quiz";
import { useDispatch } from "react-redux";

export function ResultsCard({
  score,
  totalQuestions,
  level,
  pointsEarned,
  quizId,
}) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const dispatch = useDispatch();

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! Outstanding performance!";
    if (percentage >= 80) return "Great job! You're doing very well!";
    if (percentage >= 70) return "Good work! Keep it up!";
    if (percentage >= 60) return "Not bad! There's room for improvement.";
    return "Keep practicing! You'll get better!";
  };

  return (
    <div className={styles.resultsCard}>
      <div className={styles.resultsHeader}>
        <div className={styles.scoreCircle}>
          <div className={styles.scorePercentage}>{percentage}%</div>
          <div className={styles.scoreLabel}>Score</div>
        </div>
        <h1>Quiz Complete!</h1>
        <p className={styles.scoreMessage}>{getScoreMessage()}</p>
      </div>

      <div className={styles.resultStats}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{score}</div>
          <div className={styles.statLabel}>Correct</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{totalQuestions - score}</div>
          <div className={styles.statLabel}>Incorrect</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{totalQuestions}</div>
          <div className={styles.statLabel}>Total</div>
        </div>
      </div>

      <div className={styles.resultActions}>
        <Link to={`/quiz/${level}/${quizId}`}>
          <button
            className={styles.reviewButton}
            onClick={() => {
              dispatch(quizActions.setShowReview(true));
              dispatch(quizActions.toggleShowResult(false));
            }}
          >
            Review Answers
          </button>
        </Link>
        <Link to={`/level/${level}`} className={styles.backToWorkspaceButton}>
          Back to Workspace
        </Link>
      </div>

      <div className={styles.pointsEarned}>
        <span className={styles.pointsIcon}>⭐</span>
        <span>You earned {pointsEarned} points!</span>
      </div>
    </div>
  );
}
