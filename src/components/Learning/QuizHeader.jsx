import { Link } from "react-router-dom";
import styles from "./Quiz.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authoriseActions } from "../../store/slices/authorise";

export function QuizHeader({ level, quizTitle, difficulty, timeLeft }) {
  const user = useSelector((store) => store.authorise);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.quizHeader}>
      <div className={styles.headerLeft}>
        <Link to={`/level/${level}`} className={styles.backLink}>
          <span className={styles.backArrow}>←</span>
          Back to Workspace
        </Link>
        <div className={styles.quizInfo}>
          <h1>{quizTitle}</h1>
          <span
            className={`${styles.difficultyBadge} ${
              styles[difficulty.toLowerCase()]
            }`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className={styles.headerRight}>
        {timeLeft !== null && timeLeft !== undefined && (
          <div
            className={`${styles.timer} ${
              timeLeft < 60 ? styles.timeWarning : ""
            }`}
          >
            <span className={styles.timerIcon}>⏱️</span>
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}

        <div className={styles.userInfo}>
          <span>👋 {user?.username}</span>
          {/* <span className={styles.userPoints}>
            ⭐ {user?.totalPoints || 0} pts
          </span> */}
        </div>
      </div>
    </div>
  );
}
