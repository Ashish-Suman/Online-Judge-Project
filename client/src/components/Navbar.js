
import React, { useCallback, useContext, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const [userContext, setUserContext] = useContext(UserContext);
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
        });
    };
    return(
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
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
            <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
                <li className='nav-item' key='home'>
                <NavLink to='/' className='nav-link'>Home</NavLink>
                </li>
                <li className='nav-item' key='home'>
                    {userContext.isAuthenticated === true ? 
                        <NavLink to='/' className='nav-link' onClick={logoutHandler}>logout</NavLink> : 
                        <NavLink to='/login' className='nav-link'>login</NavLink>
                    }
                </li>
            </ul>
            </div>
        </nav>
    )
}


export default Navbar;