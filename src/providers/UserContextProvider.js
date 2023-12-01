import React from 'react';
import userContext from '../store/user-context';

const UserContextProvider = (props) => {
  const user = undefined;
  return (
    <userContext.Provider value={{ user }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
