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
              vocabulary and grammar at your own pace.
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Learning</h4>
            <ul className={styles.linkList}>
              <li>
                <p className={styles.link}>Vocabulary</p>
              </li>
              <li>
                <p className={styles.link}>Grammar</p>
              </li>
              <li>
                <p className={styles.link}>Reading</p>
              </li>
              <li>
                <p className={styles.link}>Writing</p>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact Info</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>omkarchalke406@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>+91 8956676259</span>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
