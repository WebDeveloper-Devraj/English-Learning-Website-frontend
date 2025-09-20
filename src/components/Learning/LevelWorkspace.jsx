import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./LevelWorkspace.module.css";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../../store/slices/quiz";

export default function LevelWorkspace() {
  const { level } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.authorise);
  const showResult = useSelector((store) => store.quiz.showResult);
  // console.log("showResult: ", showResult);

  const calculatePoints = () => {
    if (!user || !user.quizResults) return 0;

    return user.quizResults
      .filter((quiz) => quiz.level === level)
      .reduce((total, quiz) => total + quiz.pointsEarned, 0);
  };

  // const [currentStreak, setCurrentStreak] = useState(5);
  // const [totalPoints, setTotalPoints] = useState(1250);
  // const [completedLessons, setCompletedLessons] = useState(12);
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

  const videoLessons = [
    {
      id: 1,
      title: "Basic Verbs: to be and to have",
      duration: "29:10",
      completed: true,
      points: 50,
      url: "https://www.youtube.com/embed/wBP91ksa6Mw?si=5alUwj3_KjZQRR2o",
    },
    {
      id: 2,
      title: "How to use was and were",
      duration: "15:38",
      completed: true,
      points: 30,
      url: "https://www.youtube.com/embed/MNdeEtZ5jBc?si=3fQgOZ5V7A_WULSn",
    },
    {
      id: 3,
      title: "How to use have, has, had",
      duration: "10:46",
      completed: false,
      points: 75,
      url: "https://www.youtube.com/embed/XTYRwP21QyE?si=YmNSKDk7tOpu-UcH",
    },
    {
      id: 4,
      title: "how to use can, could, may, might",
      duration: "10:34",
      completed: false,
      points: 40,
      url: "https://www.youtube.com/embed/sKQtU7JTtMQ?si=UzrrxgOFFGqr8Xit",
    },
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch("http://localhost:5000/api/quiz");
      const result = await response.json();

      const filteredQuizes = result.quizzes.filter(
        (quiz) => quiz.level === level
      );

      setQuizzes(filteredQuizes);
      dispatch(quizActions.setShowReview(false));
    };

    fetchQuizzes();
  }, []);

  // const quizzes = [
  //   {
  //     id: 1,
  //     title: "Grammar Fundamentals",
  //     questions: 15,
  //     difficulty: "Easy",
  //     points: 100,
  //     completed: true,
  //     score: 85,
  //   },
  //   {
  //     id: 2,
  //     title: "Vocabulary Challenge",
  //     questions: 20,
  //     difficulty: "Medium",
  //     points: 150,
  //     completed: false,
  //     score: null,
  //   },
  //   {
  //     id: 3,
  //     title: "Listening Comprehension",
  //     questions: 10,
  //     difficulty: "Medium",
  //     points: 120,
  //     completed: false,
  //     score: null,
  //   },
  // ];

  // const achievements = [
  //   { id: 1, title: "First Lesson", icon: "🎓", unlocked: true },
  //   { id: 2, title: "5 Day Streak", icon: "🔥", unlocked: true },
  //   { id: 3, title: "Quiz Master", icon: "🧠", unlocked: false },
  //   { id: 4, title: "Speaking Pro", icon: "🎤", unlocked: false },
  // ];

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
    // {
    //   id: "vocabulary",
    //   title: "Vocabulary Builder",
    //   icon: "📚",
    //   description: "Learn new words with flashcards",
    //   progress: 30,
    //   colorClass: "purple",
    // },
    // {
    //   id: "speaking",
    //   title: "Speaking Practice",
    //   icon: "🎤",
    //   description: "Improve pronunciation with AI feedback",
    //   progress: 25,
    //   colorClass: "red",
    // },
    // {
    //   id: "writing",
    //   title: "Writing Exercises",
    //   icon: "✍️",
    //   description: "Practice writing with guided prompts",
    //   progress: 40,
    //   colorClass: "yellow",
    // },
    // {
    //   id: "listening",
    //   title: "Listening Comprehension",
    //   icon: "🎧",
    //   description: "Audio exercises to improve understanding",
    //   progress: 55,
    //   colorClass: "indigo",
    // },
  ];

  // const activities = [
  //   {
  //     title: "Word of the Day",
  //     description: "Learn a new vocabulary word every day",
  //     icon: "📖",
  //     action: "Learn Now",
  //     colorClass: "blue",
  //   },
  //   {
  //     title: "Grammar Challenge",
  //     description: "Quick grammar exercises to sharpen your skills",
  //     icon: "✏️",
  //     action: "Start Challenge",
  //     colorClass: "green",
  //   },
  //   {
  //     title: "Pronunciation Practice",
  //     description: "Record yourself and get AI feedback",
  //     icon: "🎤",
  //     action: "Start Recording",
  //     colorClass: "red",
  //   },
  //   {
  //     title: "Reading Comprehension",
  //     description: "Read articles and answer questions",
  //     icon: "📰",
  //     action: "Read Article",
  //     colorClass: "purple",
  //   },
  //   {
  //     title: "Conversation Simulator",
  //     description: "Practice real-world conversations",
  //     icon: "💬",
  //     action: "Start Chat",
  //     colorClass: "yellow",
  //   },
  //   {
  //     title: "Writing Workshop",
  //     description: "Improve your writing with guided exercises",
  //     icon: "✍️",
  //     action: "Start Writing",
  //     colorClass: "indigo",
  //   },
  // ];

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
                {/* <p>Lesson 7 of 10</p> */}
              </div>
            </div>
          </div>

          <div className={styles.headerStats}>
            {/* <div className={styles.stat}>
              <span className={styles.statIcon}>🔥</span>
              <span className={styles.statValue}>{currentStreak}</span>
            </div> */}
            <div className={styles.stat}>
              <span className={styles.statIcon}>⭐</span>
              <span className={styles.statValue}>{calculatePoints()}</span>
            </div>
            {/* <div className={styles.stat}>
              <span className={styles.statIcon}>🏆</span>
              <span className={styles.statValue}>7</span>
            </div> */}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Progress Overview */}
          {/* <div className={styles.progressSection}>
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <h2>Your Progress</h2>
                <div className={styles.updatedTime}>Updated just now</div>
              </div>

              <div className={styles.progressStats}>
                <div className={styles.progressStat}>
                  <div className={`${styles.progressIcon} ${styles.blueIcon}`}>
                    <span>📅</span>
                  </div>
                  <div className={styles.progressValue}>23</div>
                  <div className={styles.progressLabel}>Days Active</div>
                </div>

                <div className={styles.progressStat}>
                  <div className={`${styles.progressIcon} ${styles.greenIcon}`}>
                    <span>🎯</span>
                  </div>
                  <div className={styles.progressValue}>87%</div>
                  <div className={styles.progressLabel}>Accuracy</div>
                </div>

                <div className={styles.progressStat}>
                  <div
                    className={`${styles.progressIcon} ${styles.purpleIcon}`}
                  >
                    <span>⏰</span>
                  </div>
                  <div className={styles.progressValue}>45m</div>
                  <div className={styles.progressLabel}>Today</div>
                </div>

                <div className={styles.progressStat}>
                  <div
                    className={`${styles.progressIcon} ${styles.yellowIcon}`}
                  >
                    <span>🏅</span>
                  </div>
                  <div className={styles.progressValue}>12</div>
                  <div className={styles.progressLabel}>Achievements</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Navigation Tabs */}
          <div className={styles.tabsSection}>
            <div className={styles.tabsContainer}>
              <nav className={styles.tabsNav}>
                {[
                  { id: "overview", label: "Overview" },
                  { id: "videos", label: "Video Lessons" },
                  { id: "quiz", label: "Practice Quiz" },
                  // { id: "activities", label: "Activities" },
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

                      {/* <div className={styles.progressContainer}>
                        <div className={styles.progressInfo}>
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={`${styles.progressFill} ${
                              styles[module.colorClass]
                            }`}
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              {/* <div className={styles.sidebar}> */}
              {/* Daily Challenge */}
              {/* <div className={styles.challengeCard}>
                  <h4>Daily Challenge</h4>
                  <p>Complete 3 lessons to maintain your streak!</p>
                  <div className={styles.challengeProgress}>
                    <div className={styles.challengeBar}>
                      <div className={styles.challengeFill}></div>
                    </div>
                    <span>2/3</span>
                  </div>
                </div> */}

              {/* Achievements */}
              {/* <div className={styles.achievementsCard}>
                  <h4>Recent Achievements</h4>
                  <div className={styles.achievementsList}>
                    {achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className={styles.achievement}>
                        <div
                          className={`${styles.achievementIcon} ${
                            achievement.unlocked
                              ? styles.unlocked
                              : styles.locked
                          }`}
                        >
                          <span>{achievement.icon}</span>
                        </div>
                        <div
                          className={`${styles.achievementTitle} ${
                            achievement.unlocked
                              ? styles.unlockedText
                              : styles.lockedText
                          }`}
                        >
                          {achievement.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}

              {/* Community */}
              {/* <div className={styles.communityCard}>
                  <h4>Study Together</h4>
                  <p>Join other learners in live practice sessions</p>
                  <button className={styles.joinButton}>
                    <span>👥</span>
                    <span>Join Session</span>
                  </button>
                </div> */}
              {/* </div> */}
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
                videoLessons.map((video) => (
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
                        return q.quizId.toString() === quiz._id.toString();
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
                      return q.quizId.toString() === quiz._id.toString();
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
