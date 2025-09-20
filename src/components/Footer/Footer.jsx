import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>LearnEnglish</h3>
            <p className={styles.description}>
              Free English learning platform designed to help you master
              vocabulary, grammar, reading, and writing skills at your own pace.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Learning</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#vocabulary" className={styles.link}>
                  Vocabulary
                </a>
              </li>
              <li>
                <a href="#grammar" className={styles.link}>
                  Grammar
                </a>
              </li>
              <li>
                <a href="#reading" className={styles.link}>
                  Reading
                </a>
              </li>
              <li>
                <a href="#writing" className={styles.link}>
                  Writing
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>support@learnenglish.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>Online Learning Platform</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © 2024 LearnEnglish. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <a href="#privacy" className={styles.bottomLink}>
                Privacy Policy
              </a>
              <a href="#terms" className={styles.bottomLink}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
