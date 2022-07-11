import { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./styles/Problem.css"

const Problem = () => {
    const [problem, setProblem] = useState({});
    const [message, setMessage] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("")
    const [userContext, setUserContext] = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const getProblem = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `api/problems/${params.id}`, {
          method: "GET",
          credentials: "include",
          // Pass authentication token as bearer token in header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setProblem(data.problem);
          } 
          else {
            console.log(response);
            
          }
        },);
    }, [setProblem]);

    const handleSubmit = (e) => {
      e.preventDefault();
      setError("");
      const genericErrorMessage = "Something went wrong! Please try again later.";
  
      fetch(process.env.REACT_APP_API_ENDPOINT + "api/submissions", {
        method: "POST",
        credentials: "include",
        // Pass authentication token as bearer token in header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
        body: JSON.stringify({ problemId: problem._id, language, code }),
      })
        .then(async (response) => {
          
        })
        .catch((error) => {
          setError(genericErrorMessage);
        });
    };
    useEffect(() => {
        getProblem();
    }, [getProblem]);

    const escapedNewLineToLineBreakTag = (string) => {
        if(!string){
            return string
        }
        return string.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                <br/>
            </span>
        ))
    }

    
    
    return(
      <div className='Problem'>
        <h1 className='page-header text-center'>{problem.title}</h1>
        <p>{escapedNewLineToLineBreakTag(problem.problemStatement)}</p>
        <form onSubmit={handleSubmit}>
          <div class="row align-items-end">
            <label htmlFor="language">Language</label>
                <select 
                    className="form-select" 
                    aria-label="Default select"
                    id='language' 
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    required
                >
                    <option value="">Select Language</option>
                    <option value="cpp">CPP</option>
                </select>
            </div>
            <button className='btn btn-danger' type='submit'>
                Submit <i className="fa fa-check" aria-hidden="true"></i>
            </button>
            <textarea className="bg-dark text-light w-100 form-control-lg" id='code' value={code} onChange={e => setCode(e.target.value)} required/>
        </form>
      </div>
    )
};
  
export default Problem;
