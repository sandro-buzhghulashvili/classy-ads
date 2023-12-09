import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LayoutPage = () => {
  const navigation = useNavigation();
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
