import { useDispatch, useSelector } from "react-redux";
import styles from "./Quiz.module.css";
import { quizActions } from "../../store/slices/quiz";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function QuestionCard({ question }) {
  const showReview = useSelector((store) => store.quiz.showReview);
  const selectedAnswers = useSelector((store) => store.quiz.selectedAnswers);
  const selectedAnswer = selectedAnswers[question._id];
  // console.log("showReview: ", showReview);
  // console.log("selected ans:", selectedAnswer);

  const user = useSelector((store) => store.authorise);

  const [reviewAns, setReviewAns] = useState();
  // console.log(reviewAns);

  const { quizId } = useParams();

  useEffect(() => {
    const getReviewAns = () => {
      const quiz =
        user.quizResults.find((q) => q.quizId.toString() === quizId)
          ?.selectedAnswers || [];

      const answersObj = quiz.reduce((acc, ans) => {
        acc[ans.questionId] = ans.selectedOption;
        return acc;
      }, {});

      setReviewAns(answersObj[question._id]);
      // console.log("answersObj:", answersObj);
    };

    if (showReview) {
      getReviewAns();
    }
  }, [question]);

  const dispatch = useDispatch();

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <h2>{question.question}</h2>
        {question.text && (
          <div className={styles.questionText}>"{question.text}"</div>
        )}
      </div>

      <div className={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.optionButton} ${
              selectedAnswer === index ? styles.selected : ""
            } ${reviewAns === index ? styles.selected : ""}`}
            onClick={() => {
              // console.log("called");
              dispatch(
                quizActions.setSelectedAnswers({
                  questionId: question._id,
                  index,
                })
              );
            }}
            disabled={showReview}
          >
            <div className={styles.optionCircle}>
              <span>{String.fromCharCode(65 + index)}</span>
            </div>
            <span className={styles.optionText}>{option}</span>
          </button>
        ))}
      </div>

      {showReview && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeader}>
            <span className={styles.explanationIcon}>
              {reviewAns === question.correctAnswer ? "✅" : "❌"}
            </span>
            <strong>
              {reviewAns === question.correctAnswer ? "Correct!" : "Incorrect"}
            </strong>
          </div>
          <p>{question.explanation}</p>
          {reviewAns !== question.correctAnswer && (
            <p className={styles.correctAnswer}>
              The correct answer was:{" "}
              <strong>
                {String.fromCharCode(65 + question.correctAnswer)}{" "}
                {question.options[question.correctAnswer]}
              </strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
