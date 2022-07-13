
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    const navigate = useNavigate();
    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "api/users/logout", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }).then(async (response) => {
          setUserContext((oldValues) => {
            return { ...oldValues, username: null, isAuthenticated: false, token: null };
          });
          window.localStorage.setItem("logout", Date.now());
          navigate("/");
        });
    };
    return(
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark d-flex'>
            <Link className='navbar-brand' to='/'>
            Online Judge
            </Link>
            <button className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
            >
            <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse justify-content-center' id='navbarNav'>
              <div className='navbar-nav'>
                  <NavLink to='/' className='nav-link'>Home</NavLink>
                  <NavLink to='/problems' className='nav-link'>Problems</NavLink>
                  <NavLink to='/submissions' className='nav-link'>Submissions</NavLink>
              </div>
                  {userContext.isAuthenticated === true ? 

                      <div className="navbar-nav ms-auto">  
                      <NavLink to='/logout' className='nav-link' onClick={logoutHandler}>Logout</NavLink>
                      </div> :
                      <div className="navbar-nav ms-auto">
                        <NavLink to='/login' className='nav-link'>Login</NavLink>
                        <NavLink to='/register' className='nav-link'>Register</NavLink>
                      </div> 
                      
                  }
              </div>
        </nav>
    )
}


export default Navbar;