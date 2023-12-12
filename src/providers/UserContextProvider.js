import React, { useState } from 'react';
import userContext from '../store/user-context';

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [flashMessage, setFlashMessage] = useState(undefined);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  const clearFlashMessage = () => {
    setFlashMessage(undefined);
  };

  const applyFlashMessage = (msg) => {
    setFlashMessage(msg)
  }

  return (
    <userContext.Provider value={{ user, login, logout, flashMessage, clearFlashMessage, applyFlashMessage }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
