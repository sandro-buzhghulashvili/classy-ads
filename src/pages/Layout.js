import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LayoutPage = () => {
  return (
    <>
      {/* {navigation.state === 'loading' && <Navbar />} */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPage;
