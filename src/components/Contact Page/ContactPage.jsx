import { useDispatch, useSelector } from "react-redux";
import styles from "./ContactPage.module.css";
import { useNavigate } from "react-router-dom";
import { flashMessageActions } from "../../store/slices/flashMessage";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function ContactPage() {
  const user = useSelector((store) => store.authorise);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      dispatch(
        flashMessageActions.setFlashMessage({
          message: "Please log in before submitting review!",
          type: "error",
        })
      );
      return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (result.success) {
      form.reset(); // ✅ Clear form fields
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.headerInfo}>
                <h1>Contact Support</h1>
                <p>Get help with your language learning journey</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>Send us a message</h2>
                <p>We'll get back to you as soon as possible</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={user ? user.username : ""}
                      required
                      className={`${styles.input}`}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className={`${styles.input}`}
                      placeholder="What is this about?"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className={`${styles.textarea}`}
                    placeholder="Please describe your question or issue in detail..."
                    rows="6"
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitButton}>
                    <span className={styles.buttonIcon}>📤</span>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Other ways to reach us</h3>
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.contactIcon}>📧</div>
                  <div>
                    <h4>Email Support</h4>
                    <p>omkarchalke406@gmail.com</p>
                    <span>Response within 24 hours</span>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.contactIcon}>
                    <span style={{ color: "black", fontSize: "20px" }}>📞</span>
                  </div>
                  <div>
                    <h4>Phone number</h4>
                    <p>8956676259</p>
                    <p>Available Mon-Fri, 9AM-6PM</p>
                    <span>Instant response during business hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
