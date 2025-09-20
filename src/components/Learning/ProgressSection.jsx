import styles from './Quiz.module.css';

export function ProgressSection({ currentQuestion, totalQuestions }) {
  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className={styles.progressSection}>
      <div className={styles.progressInfo}>
        <span>
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}