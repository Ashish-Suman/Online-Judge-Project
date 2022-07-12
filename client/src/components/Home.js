import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import "./styles/Home.css";

const Home = () => {
    return(
        <div className='Home'>
            <Link to="/problems" className='btn btn-lg btn-secondary font-weight-bold border-white bg-white vertical-center'>
                Start Solving
            </Link>
        </div>
    )
};
  
export default Home;
