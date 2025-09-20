import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./LevelWorkspace.module.css";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../../store/slices/quiz";
import { videoLessons } from "./videoData";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function LevelWorkspace() {
  const { level } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.authorise);

  const calculatePoints = () => {
    if (!user || !user.quizResults) return 0;

    return user.quizResults
      .filter((quiz) => quiz.level === level)
      .reduce((total, quiz) => total + quiz.pointsEarned, 0);
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const levelConfig = {
    beginner: {
      title: "Beginner",
      icon: "🌱",
      colorClass: "green",
    },
    intermediate: {
      title: "Intermediate",
      icon: "🚀",
      colorClass: "blue",
    },
    advanced: {
      title: "Advanced",
      icon: "🎯",
      colorClass: "purple",
    },
  };

  const [quizzes, setQuizzes] = useState([]);

  const currentLevel = levelConfig[level] || levelConfig.beginner;

  const filteredVideoLessons = videoLessons.filter(
    (video) => video.level === level
  );

  console.log(filteredVideoLessons);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(`${BASE_URL}/api/quiz`);
      const result = await response.json();

      // console.log("quiz: ", quizId);

      const filteredQuizes = result.quizzes.filter(
        (quiz) => quiz.level === level
      );

      setQuizzes(filteredQuizes);
      dispatch(quizActions.setShowReview(false));
    };

    fetchQuizzes();
  }, []);

  const learningModules = [
    {
      id: "videos",
      title: "Video Lessons",
      icon: "▶️",
      description: "Interactive video tutorials with expert instructors",
      progress: 45,
      colorClass: "blue",
    },
    {
      id: "quiz",
      title: "Practice Quiz",
      icon: "🎯",
      description: "Test your knowledge and earn points",
      progress: 60,
      colorClass: "green",
    },
  ];

  return (
    <div className={styles.levelWorkspace}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLeft}>
            <Link to="/level" className={styles.backLink}>
              <span className={styles.backArrow}>←</span>
              Back to Levels
            </Link>
            <div className={styles.divider}></div>
            <div className={styles.levelInfo}>
              <div
                className={`${styles.levelIconHeader} ${
                  styles[currentLevel.colorClass]
                }`}
              >
                <span>{currentLevel.icon}</span>
              </div>
              <div>
                <h1>{currentLevel.title} Level</h1>
              </div>
            </div>
          </div>

          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>⭐</span>
              <span className={styles.statValue}>{calculatePoints()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Navigation Tabs */}
          <div className={styles.tabsSection}>
            <div className={styles.tabsContainer}>
              <nav className={styles.tabsNav}>
                {[
                  { id: "overview", label: "Overview" },
                  { id: "videos", label: "Video Lessons" },
                  { id: "quiz", label: "Practice Quiz" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${styles.tab} ${
                      activeTab === tab.id
                        ? styles.activeTab
                        : styles.inactiveTab
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className={styles.overviewContent}>
              {/* Learning Modules */}
              <div className={styles.modulesSection}>
                <h3>Learning Modules</h3>
                <div className={styles.modulesGrid}>
                  {learningModules.map((module) => (
                    <div
                      key={module.id}
                      className={styles.moduleCard}
                      onClick={() => setActiveTab(module.id)}
                    >
                      <div className={styles.moduleHeader}>
                        <div
                          className={`${styles.moduleIcon} ${
                            styles[module.colorClass]
                          }`}
                        >
                          <span>{module.icon}</span>
                        </div>
                        <span className={styles.chevron}>→</span>
                      </div>

                      <h4>{module.title}</h4>
                      <p>{module.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div className={styles.videosGrid}>
              {selectedVideo ? (
                <div className={styles.videoPlayer}>
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <button
                    className={styles.backButton}
                    onClick={() => setSelectedVideo(null)}
                  >
                    ← Back to Lessons
                  </button>
                </div>
              ) : (
                filteredVideoLessons.map((video) => (
                  <div
                    key={video.id}
                    className={styles.videoCard}
                    onClick={() => setSelectedVideo(video.url)}
                  >
                    <div className={styles.videoThumbnail}>
                      {/* <span className={styles.thumbnailIcon}>
                        {video.thumbnail}
                      </span> */}
                      <div className={styles.playOverlay}>
                        <div className={styles.playButton}>
                          <span>▶</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.videoContent}>
                      <h4>{video.title}</h4>
                      <div className={styles.videoMeta}>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "quiz" && (
            <div className={styles.quizzesGrid}>
              {quizzes.map((quiz) => (
                <div key={quiz._id} className={styles.quizCard}>
                  <div className={styles.quizHeader}>
                    <h4>{quiz.title}</h4>
                    <span
                      className={`${styles.difficultyBadge} ${
                        styles[quiz.difficulty.toLowerCase()]
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>

                  <div className={styles.quizInfo}>
                    <div className={styles.quizMeta}>
                      <span>{quiz.questions.length} questions</span>
                      <span>{quiz.questions.length * 10} points</span>
                    </div>

                    {(() => {
                      const attemptedQuiz = user.quizResults.find((q) => {
                        return q._id.toString() === quiz._id.toString();
                      });

                      if (attemptedQuiz) {
                        return (
                          <div className={styles.score}>
                            <span>Your score:</span>
                            <span className={styles.scoreValue}>
                              {Math.round(
                                (attemptedQuiz.score /
                                  attemptedQuiz.totalQuestions) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        );
                      }

                      return null;
                    })()}
                  </div>

                  {(() => {
                    const attemptedQuiz = user.quizResults.find((q) => {
                      return q._id.toString() === quiz._id.toString();
                    });

                    return (
                      <button
                        className={`${styles.quizButton} ${
                          attemptedQuiz
                            ? styles.reviewButton
                            : styles.startQuizButton
                        }`}
                        onClick={() => navigate(`/quiz/${level}/${quiz._id}`)}
                      >
                        {attemptedQuiz ? "View Result" : "Start Quiz"}
                      </button>
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
