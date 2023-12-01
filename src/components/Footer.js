import React from 'react';

import classes from './Footer.module.scss';
import Newsletter from './Newsletter';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <Newsletter />
      <footer className={classes.footer}>
        <div className={classes.container}>
          <section>
            <h1>About</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident rerum unde possimus molestias dolorem fuga, illo quis
              fugiat!
            </p>
          </section>
          <section>
            <h1>Navigations</h1>
            <ul>
              <li>
                <a href="#nowhere">About Us</a>
              </li>
              <li>
                <a href="#nowhere">Services</a>
              </li>
              <li>
                <a href="#nowhere">Testimonials</a>
              </li>
              <li>
                <a href="#nowhere">Contact Us</a>
              </li>
            </ul>
          </section>
          <section>
            <h1>Follow Us</h1>
            <div className={classes.icons}>
              <span className={classes.icon}>
                <Facebook />
              </span>
              <span className={classes.icon}>
                <Twitter />
              </span>
              <span className={classes.icon}>
                <Instagram />
              </span>
              <span className={classes.icon}>
                <Linkedin />
              </span>
            </div>
          </section>
          <section>
            <input type="text" placeholder="Search products..." />
            <button>Search</button>
          </section>
        </div>
        <h2 className={classes.copyright}>
          Copyright ©2023 All rights reserved |{' '}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://sandro-buzhgulashvili.web.app"
          >
            Sandro Buzhghulashvili
          </a>
        </h2>
      </footer>
    </>
  );
};

export default Footer;
