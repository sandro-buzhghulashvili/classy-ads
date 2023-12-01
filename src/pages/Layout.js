import React from 'react';
import { Outlet } from 'react-router-dom';

import UserContextProvider from '../providers/UserContextProvider';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LayoutPage = () => {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </UserContextProvider>
  );
};

export default LayoutPage;
