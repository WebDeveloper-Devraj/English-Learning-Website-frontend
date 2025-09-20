import { createBrowserRouter } from "react-router-dom";
import App from "./routes/App";
import LevelChoice from "./components/Learning/LevelChoice";
import Home from "./components/Home/Home";
import LevelWorkspace from "./components/Learning/LevelWorkspace";
import Quiz from "./components/Learning/Quiz";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { ContactPage } from "./components/Contact Page/ContactPage";
import { AboutPage } from "./components/AboutPage/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/level", element: <LevelChoice /> },
      { path: "/level/:level", element: <LevelWorkspace /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
  { path: "/quiz/:level/:quizId", element: <Quiz /> },
]);

export default router;
