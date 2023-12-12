import React, {useContext} from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import userContext from '../store/user-context';

import FlashMessage from "../components/UI/FlashMessage"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/UI/LoadingScreen';
import { createPortal } from 'react-dom';

const LayoutPage = () => {
  const navigation = useNavigation()
  const ctx = useContext(userContext)

  console.log(ctx.flashMessage)

  return (
    <>
      {navigation.state === "loading" && createPortal(<LoadingScreen />, document.getElementById("loading"))}
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
