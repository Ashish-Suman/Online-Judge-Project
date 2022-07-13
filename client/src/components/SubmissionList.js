import { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const SubmissionList = () => {
    const [submissions, setSubmissions] = useState([]);
    const [userContext, setUserContext] = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getSubmissions = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/submissions", {
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
            console.log(data);
            setSubmissions(data.submissions);
          } 
          else {
            console.log(response);
          }
        },);
    }, [setSubmissions]);
    

    useEffect(() => {
        getSubmissions();
    }, [getSubmissions]);
    
   
    return(
      <div>
        <h1 className='text-center mt-3'>Submissions</h1>
        <table className="table mt-5">
          <thead className='table-danger'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Problem</th>
              <th scope="col">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => {
              return(
                <tr className={submission.verdict === "ACCEPTED" ? "table-success" : "table-light"} key={index}>
                  <th scope='row'>{index+1}</th>
                  <td onClick={() => navigate(`/problems/${submission.problemId}`)}>{submission.problemName}</td>
                  <td>{submission.verdict}</td>
                  <td onClick={() => navigate(`/submissions/${submission._id}`)}><i class="fas fa-code"></i></td>
                </tr>
              )
            })}
        </tbody>
      </table>
      </div>
    )
};
  
export default SubmissionList;
