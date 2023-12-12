import React, {useContext, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import userContext from '../store/user-context';

import FlashMessage from "../components/UI/FlashMessage"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';

const LayoutPage = () => {
  const ctx = useContext(userContext)

  console.log(ctx.flashMessage)

  return (
    <>
      {/* {navigation.state === 'loading' && <Navbar />} */}
      <AnimatePresence>
        {ctx.flashMessage && <FlashMessage success={ctx.flashMessage.status === "error" ? false : true} text={ctx.flashMessage.message} onClose={ctx.clearFlashMessage} />}
      </AnimatePresence>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutPage;
