import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
  
      const genericErrorMessage = "Something went wrong! Please try again later.";
  
      fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then(async (response) => {
          setIsSubmitting(false);
          if (!response.ok) {
            if (response.status === 400) {
              setError("Please fill all the fields correctly!");
            } else if (response.status === 401) {
              setError("Invalid Username and Password combination.");
            } else {
              setError(genericErrorMessage);
            }
          } else {
            const data = await response.json();
            console.log("data", data);
            setUserContext((oldValues) => {
              return { 
                ...oldValues,
                username: username,
                token: data.token,
                isAuthenticated: true,
                isRegistered: true
             };
            });
            navigate("/");
          }
        })
        .catch((error) => {
          setIsSubmitting(false);
          setError(genericErrorMessage);
        });
    };
    return(
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                    <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form mb-3">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="form mb-3">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                className="form-control" 
                                id="password" 
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                autoComplete="on"
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button 
                                className="btn btn-primary btn-login text-uppercase fw-bold" 
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div id="Help" className="form-text text-center mt-5 text-dark">Not
                    Registered? <Link to={"/register"} className="text-dark fw-bold"> Create an
                        Account</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
};
  
export default Login;
