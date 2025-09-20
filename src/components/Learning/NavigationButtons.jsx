import { useSelector } from "react-redux";
import styles from "./Quiz.module.css";

export function NavigationButtons({
  currentQuestion,
  totalQuestions,
  questions,
  currentQuestionId,
  onPrevQuestion,
  onNextQuestion,
  onSubmitQuiz,
  onQuestionSelect,
}) {
  const selectedAnswers = useSelector((store) => store.quiz.selectedAnswers);
  // console.log("selected ansereeeeee: ", selectedAnswers);

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === totalQuestions;
  const currentQuestionAnswered =
    selectedAnswers[currentQuestionId] !== undefined;

  return (
    <div className={styles.navigationButtons}>
      <button
        className={styles.navButton}
        onClick={onPrevQuestion}
        disabled={currentQuestion === 0}
      >
        ← Previous
      </button>

      <div className={styles.questionDots}>
        {questions.map((_, index) => (
          <button
            key={index}
            className={`${styles.questionDot} ${
              index === currentQuestion ? styles.active : ""
            } ${
              selectedAnswers[questions[index].id] !== undefined
                ? styles.answered
                : ""
            }`}
            onClick={() => onQuestionSelect(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isLastQuestion ? (
        <button
          className={styles.submitButton}
          onClick={onSubmitQuiz}
          disabled={!allQuestionsAnswered}
        >
          Submit Quiz
        </button>
      ) : (
        <button
          className={styles.navButton}
          onClick={onNextQuestion}
          disabled={!currentQuestionAnswered}
        >
          Next →
        </button>
      )}
    </div>
  );
}
