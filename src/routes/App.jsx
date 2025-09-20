import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import FlashMessage from "../components/FlashMessage/FlashMessage";

export default function App() {
  return (
    <div className={styles.app}>
      <FlashMessage />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
