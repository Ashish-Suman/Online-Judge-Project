import { useContext, useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [userContext, setUserContext] = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getProblems = useCallback(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/problems/", {
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
            setProblems(data.problems);
          } 
          else {
            console.log(response);
          }
        },);
    }, [setProblems]);
    

    useEffect(() => {
        getProblems();
    }, [getProblems]);
    
   
    return(
      <div>
        <table className="table mt-5">
          <thead className='table-danger'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Problem</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => {
              console.log(problem._id);
              return(
                <tr className={problem.hasSolved ? "table-success" : "table-light"} key={index}>
                  <th scope='row'>{index+1}</th>
                  <td onClick={() => navigate(`/problems/${problem._id}`)}>{problem.title}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      </div>
    )
};
  
export default ProblemList;
