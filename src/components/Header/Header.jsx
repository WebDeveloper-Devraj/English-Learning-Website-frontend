import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";

import { authoriseActions } from "../../store/slices/authorise";
import { flashMessageActions } from "../../store/slices/flashMessage";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector((store) => store.authorise);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      dispatch(authoriseActions.setUser(null));
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
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/">
            <h2>LearnEnglish</h2>
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/level"
            end
            className={({ isActive }) => (isActive ? styles.activeLink : null)}
          >
            Start Learning
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : null
              }
            >
              My Dashboard
            </NavLink>
          )}
          <NavLink
            to="/about"
            end
            className={({ isActive }) => (isActive ? styles.activeLink : null)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            end
            className={({ isActive }) => (isActive ? styles.activeLink : null)}
          >
            Contact
          </NavLink>
        </nav>

        <div className={styles.authSection}>
          {user ? (
            <button onClick={handleLogout} className={styles.signupBtn}>
              👋 Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button variant="outline" className={styles.loginBtn}>
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className={styles.signupBtn}>Sign Up Free</button>
              </Link>
            </>
          )}
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`${styles.hamburger} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <nav className={styles.mobileNav}>
            <NavLink
              to="/level"
              end
              className={({ isActive }) =>
                isActive ? styles.activeMobileLink : styles.mobileNavLink
              }
              onClick={closeMobileMenu}
            >
              Start Learning
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeMobileLink : styles.mobileNavLink
                }
                onClick={closeMobileMenu}
              >
                My Dashboard
              </NavLink>
            )}
            <NavLink
              to="/about"
              end
              className={({ isActive }) =>
                isActive ? styles.activeMobileLink : styles.mobileNavLink
              }
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              end
              className={({ isActive }) =>
                isActive ? styles.activeMobileLink : styles.mobileNavLink
              }
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
          </nav>

          <div className={styles.mobileAuthSection}>
            {user ? (
              <button onClick={handleLogout} className={styles.mobileSignupBtn}>
                👋 Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>
                  <button className={styles.mobileLoginBtn}>Login</button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <button className={styles.mobileSignupBtn}>
                    Sign Up Free
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
