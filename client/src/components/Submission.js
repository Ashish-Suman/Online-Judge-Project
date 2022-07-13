import { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useParams, browserHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Submission = () => {
    const [submission, setSubmission] = useState({});
    const [message, setMessage] = useState("");
    const [userContext, setUserContext] = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const getSubmission = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + `api/Submissions/${params.id}`, {
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
            console.log("data -> ", data);
            setSubmission(data.submission);
          } 
          else {
            console.log("response -> ", response);
            
          }
        },);
    }, [setSubmission]);

    useEffect(() => {
        getSubmission();
    }, [getSubmission]);

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
      <div className='container-fluid mt-3'>
        <div className='d-flex justify-content-between'>
            <h3>Problem: {submission.problemName}</h3>
            <h3>Verdict: {submission.verdict}</h3>
        </div>
        <p className="bg-dark text-light w-100 mt-3" >{escapedNewLineToLineBreakTag(submission.code)}</p>
        <button
            className="btn btn-info"
            onClick={() => {navigate(-1)}}>
            Back To Submissions
        </button>
      </div>
    )
};
  
export default Submission;
