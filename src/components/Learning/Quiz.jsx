import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QuizHeader } from "./QuizHeader";
import { ProgressSection } from "./ProgressSection";
import { QuestionCard } from "./QuestionCard";
import { NavigationButtons } from "./NavigationButtons";
import { ResultsCard } from "./ResultsCard";
import styles from "./Quiz.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { authoriseActions } from "../../store/slices/authorise";
import { quizActions } from "../../store/slices/quiz";

export default function Quiz() {
  const { level, quizId } = useParams();
  const user = useSelector((store) => store.authorise);
  // console.log(user);
  const showResult = useSelector((store) => store.quiz.showResult);
  const selectedAnswers = useSelector((store) => store.quiz.selectedAnswers);
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (user) {
      const attemptedQuiz = user.quizResults.find(
        (q) => q.quizId.toString() === quizId.toString()
      );

      if (attemptedQuiz) {
        // user already attempted this quiz
        dispatch(quizActions.toggleShowResult(true));
      } else {
        dispatch(quizActions.toggleShowResult(false)); // quiz not attempted
      }
    }
  }, []);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch(`http://localhost:5000/api/quiz/${quizId}`);
      const result = await response.json();
      setQuiz(result.quiz);
    };

    fetchQuiz();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    let correctCount = 0;

    quiz.questions.forEach((question) => {
      const selectedOption = selectedAnswers[question._id];

      if (question.type === "mcq") {
        // MCQ: compare indices
        if (selectedOption === question.correctAnswer) {
          correctCount++;
        }
      } else if (question.type === "fillblank") {
        // Fill-in-the-blank: compare strings (case-insensitive)
        if (
          selectedOption &&
          selectedOption.toString().trim().toLowerCase() ===
            question.correctAnswer.toString().trim().toLowerCase()
        ) {
          correctCount++;
        }
      }
    });

    // const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const pointsEarned = correctCount * 10;

    // Update user points
    if (user && level) {
      const quizResult = {
        userId: user._id,
        level,
        quizId: quizId,
        selectedAnswers,
        score: correctCount,
        totalQuestions: quiz.questions.length,
        pointsEarned,
        completedAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:5000/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizResult),
        credentials: "include",
      });

      const result = await response.json();
      // console.log(result);

      if (result.success) {
        dispatch(authoriseActions.setUser(result.user));
        dispatch(quizActions.toggleShowResult(true));
        dispatch(quizActions.clearSelectedAnswers());
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "success",
          })
        );
      } else {
        dispatch(
          flashMessageActions.setFlashMessage({
            message: result.message,
            type: "error",
          })
        );
      }
    }
  };

  if (!quiz) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.errorMessage}>
          <h1>Quiz not found</h1>
          <Link to={`/level/${level}`} className={styles.backButton}>
            Back to Workspace
          </Link>
        </div>
      </div>
    );
  }

  if (showResult) {
    const attemptedQuiz = user.quizResults.find(
      (q) => q.quizId.toString() === quizId.toString()
    );

    return (
      <div className={styles.quizContainer}>
        <ResultsCard
          score={attemptedQuiz.score}
          totalQuestions={attemptedQuiz.totalQuestions}
          level={attemptedQuiz.level}
          pointsEarned={attemptedQuiz.pointsEarned}
          quizId={quizId}
        />
      </div>
    );
  }

  if (quiz) {
    const question = quiz.questions[currentQuestion];

    return (
      <div className={styles.quizContainer}>
        <QuizHeader
          level={level || ""}
          quizTitle={quiz.title}
          difficulty={quiz.difficulty}
        />

        <ProgressSection
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
        />

        <QuestionCard question={question} />

        <NavigationButtons
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
          questions={quiz.questions}
          currentQuestionId={question._id}
          onPrevQuestion={handlePrevQuestion}
          onNextQuestion={handleNextQuestion}
          onSubmitQuiz={handleSubmitQuiz}
          onQuestionSelect={setCurrentQuestion}
        />
      </div>
    );
  }
}
