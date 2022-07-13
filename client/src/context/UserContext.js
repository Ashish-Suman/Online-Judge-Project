import React, { useState, useEffect } from "react";

const UserContext = React.createContext([{}, () => {}]);

const initialState = {
  username: null,
  token: null,
  isAuthenticated: false,
}

function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("Unable to Acess local Storage at the moment", e);
  }
}

function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

const UserProvider = (props) => {
  const [state, setState] = useState(() => getLocalStorage("state", initialState));
  console.log(state);
  useEffect(() => {
    setLocalStorage("state", state);
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
