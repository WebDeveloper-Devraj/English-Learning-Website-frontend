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

  const dispatch = useDispatch();
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

  // Handle typing for fill-in-the-blank
  const handleInputChange = (e) => {
    dispatch(
      quizActions.setSelectedAnswers({
        questionId: question._id,
        index: e.target.value, // store actual string
      })
    );
  };

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <h2>{question.question}</h2>
        {question.text && (
          <div className={styles.questionText}>
            {question.type === "mcq" && <p>"{question.text}"</p>}
            {question.type === "fillblank" && (
              <p>
                {question.text.split("____").map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <input
                        type="text"
                        value={selectedAnswer || reviewAns || ""}
                        onChange={handleInputChange}
                        disabled={showReview}
                        className={styles.blankInput}
                      />
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ✅ For MCQ type */}
      {question.type === "mcq" && (
        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                selectedAnswer === index ? styles.selected : ""
              } ${reviewAns === index ? styles.selected : ""}`}
              onClick={() =>
                dispatch(
                  quizActions.setSelectedAnswers({
                    questionId: question._id,
                    index,
                  })
                )
              }
              disabled={showReview}
            >
              <div className={styles.optionCircle}>
                <span>{String.fromCharCode(65 + index)}</span>
              </div>
              <span className={styles.optionText}>{option}</span>
            </button>
          ))}
        </div>
      )}

      {/* ✅ For Fill-in-the-Blank type */}
      {question.type === "fillblank" && (
        <div className={styles.fillBlankContainer}>
          <div className={styles.optionsHint}>
            <strong>Options:</strong> {question.options.join(", ")}
          </div>
        </div>
      )}

      {/* ✅ Explanation after review */}
      {showReview && (
        <div className={styles.explanation}>
          <div className={styles.explanationHeader}>
            <span className={styles.explanationIcon}>
              {reviewAns?.toString().toLowerCase() ===
              question.correctAnswer.toString().toLowerCase()
                ? "✅"
                : "❌"}
            </span>
            <strong>
              {reviewAns?.toString().toLowerCase() ===
              question.correctAnswer.toString().toLowerCase()
                ? "Correct!"
                : "Incorrect"}
            </strong>
          </div>
          <p>{question.explanation}</p>
          {reviewAns?.toString().toLowerCase() !==
            question.correctAnswer.toString().toLowerCase() && (
            <p className={styles.correctAnswer}>
              The correct answer was: <strong>{question.correctAnswer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
