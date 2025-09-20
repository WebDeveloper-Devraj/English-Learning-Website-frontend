import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import { useDispatch } from "react-redux";
import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    event.stopPropagation(); // Prevent actual submission
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      dispatch(authoriseActions.setUser(result.user));
      dispatch(
        flashMessageActions.setFlashMessage({
          message: result.message,
          type: "success",
        })
      );

      navigate("/");
    } else {
      dispatch(
        flashMessageActions.setFlashMessage({
          message: result.message,
          type: "error",
        })
      );
      navigate("/login");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <Link to="/" className={styles.logoLink}>
            <h2 className={styles.logo}>LearnEnglish</h2>
          </Link>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to continue your English learning journey
          </p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
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
              required
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
              minLength="6"
              className={`${styles.input}`}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxText}>Remember me</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div> */}

          <button
            type="submit"
            className={styles.loginButton}
            // disabled={isLoading}
          >
            Login{/* {isLoading ? "Signing In..." : "Sign In"} */}
          </button>
        </form>

        {/* <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div> */}
        <br />

        {/* <div className={styles.socialLogin}>
          <button className={styles.socialButton}>
            <span className={styles.socialIcon}>🔍</span>
            Continue with Google
          </button>
        </div> */}

        <div className={styles.signupPrompt}>
          <span>Don't have an account? </span>
          <Link to="/signup" className={styles.signupLink}>
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
