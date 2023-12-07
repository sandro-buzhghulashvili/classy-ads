import React, { useState, useContext } from 'react';
import userContext from '../store/user-context';

import { ChevronDown, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './Navbar.module.scss';

const Navbar = () => {
  const ctx = useContext(userContext);

  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    if (window.innerWidth > 1000) {
      return;
    } else {
      setToggleDropdown((prevValue) => !prevValue);
    }
  };

  console.log(ctx);

  const toggleNavbarHandler = () => {
    setToggleNavbar((prevValue) => !prevValue);
  };

  return (
    <div className={classes.nav}>
      <a href="#top" className={classes.logo}>
        CLASSY<span>ADS</span>
      </a>
      <span className={classes.menu}>
        <Menu onClick={toggleNavbarHandler} />
      </span>
      <div
        className={`${classes['nav-links']} ${
          toggleNavbar ? classes.toggle : null
        }`}
      >
        <span onClick={toggleNavbarHandler} className={classes.quit}>
          <X />
        </span>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : null)}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : null)}
              to="/ads"
            >
              Ads
            </NavLink>
          </li>
          <li className={classes.dropdown}>
            <NavLink onClick={toggleDropdownHandler}>
              About
              <motion.span animate={{ rotate: toggleDropdown ? 180 : 0 }}>
                <ChevronDown />
              </motion.span>
            </NavLink>
            <ul className={`${classes['dropdown-menu']}`}>
              <li>The Company</li>
              <li>The Leadership</li>
              <li>Philosophy</li>
              <li>Careers</li>
            </ul>
            <AnimatePresence>
              {toggleDropdown && (
                <motion.ul
                  variants={{
                    hidden: { opacity: 0, height: 0 },
                    visible: { opacity: 1, height: 'auto' },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={classes['dropdown-menu']}
                >
                  <li>The Company</li>
                  <li>The Leadership</li>
                  <li>Philosophy</li>
                  <li>Careers</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : null)}
              to="/blog"
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : null)}
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {
          !ctx.user ?
          <>
          <NavLink className={classes.auth} to="form?mode=login">
            Login
          </NavLink>
          <NavLink className={classes.auth} to="form?mode=signup">
            Register
          </NavLink> 
          </> :
          <>
          <NavLink to='profile' className={({isActive}) => `${classes.profile} ${isActive ? classes.active : undefined}`}>Profile</NavLink>
          <button>+ Post an Ad</button>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;
