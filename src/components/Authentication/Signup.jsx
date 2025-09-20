import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";

import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    event.stopPropagation(); // Prevent actual submission
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      dispatch(authoriseActions.setUser(result.user));
      navigate("/");
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
      navigate("/signup");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={styles.signupHeader}>
          <Link to="/" className={styles.logoLink}>
            <h2 className={styles.logo}>LearnEnglish</h2>
          </Link>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Start your English learning journey today
          </p>
        </div>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              className={`${styles.input}`}
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input}`}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${styles.input}`}
              placeholder="Create a strong password"
            />
          </div>

          <button type="submit" className={styles.signupButton}>
            Create Account
            {/* {isLoading ? "Creating Account..." : "Create Account"} */}
          </button>
        </form>
        <br />

        {/* <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.socialButton}>
            <span className={styles.socialIcon}>🔍</span>
            Sign up with Google
          </button>
        </div> */}

        <div className={styles.loginPrompt}>
          <span>Already have an account? </span>
          <Link to="/login" className={styles.loginLink}>
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
