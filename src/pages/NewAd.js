import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const NewAd = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/ads');
    }, 2000);
  }, []);
  return <h1 style={{ margin: '100px 0' }}>New ad</h1>;
};

export default NewAd;
