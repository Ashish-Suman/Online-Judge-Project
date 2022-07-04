import { Route, Routes , Navigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ProblemList from "./components/ProblemList";
import Problem from "./components/Problem";
import './App.css';
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);
  console.log("api", process.env.REACT_APP_API_ENDPOINT);
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
          return { ...oldValues, username: null, isAuthenticated: false, token: null };
        });
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

  return(
    <div>
      <Navbar isLoggedIn={userContext.token != null}/>
      <div className="container">
        <Routes>
          <Route path="/" element={userContext.token != null ? <h1>HOME</h1> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={userContext.token != null ?<ProblemList /> : <Navigate to={"/login"} />} />
          <Route path="/problems/:id" element={userContext.token != null ?<Problem /> : <Navigate to={"/login"} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;