import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import classes from './FlashMessage.module.scss';
import { X } from 'lucide-react';

const FlashMessage = ({ success, text, onClose }) => {
  useEffect(() => {
    const disable = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(disable);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.3 }}
      className={`${classes.flash} ${
        success ? classes.success : classes.error
      }`}
    >
      <p>{text}</p>
      <span className={classes.close} onClick={onClose}>
        <X />
      </span>
    </motion.div>
  );
};

export default FlashMessage;
