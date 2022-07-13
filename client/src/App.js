import { Route, Routes , Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ProblemList from "./components/ProblemList";
import Problem from "./components/Problem";
import SubmissionList from "./components/SubmissionList";
import Submission from "./components/Submission";
import './App.css';
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function App() {
  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);
  console.log("api", process.env.REACT_APP_API_ENDPOINT);
  const navigate = useNavigate();
  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/refreshToken", {
      method: "POST",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, username: null, isAuthenticated: false, isRegister: false, token: null };
        });
        console.log(response.data);
        navigate("/login");
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);
  console.log(useContext.token);
  return(
    <div>
      <Navbar isLoggedIn={userContext.token != null}/>
        <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={userContext.token != null ?<ProblemList /> : <Navigate to={"/login"} />} />
          <Route path="/problems/:id" element={userContext.token != null ?<Problem /> : <Navigate to={"/login"} />} />
          <Route path="/submissions" element={userContext.token != null ?<SubmissionList /> : <Navigate to={"/login"} />} />
          <Route path="/submissions/:id" element={userContext.token != null ?<Submission /> : <Navigate to={"/login"} />} />
        </Routes>
    </div>
  )
}

export default App;