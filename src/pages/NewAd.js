import React, {useContext,useEffect} from 'react';

import userContext from '../store/user-context';
import { useNavigate } from 'react-router';

import NewAdForm from '../components/NewAdForm';

const NewAd = () => {
  const ctx = useContext(userContext)
  const navigate = useNavigate()


  useEffect(() => {
    if(!ctx.user) {
      ctx.applyFlashMessage({status : 'error', message : "User is not logged in"})
      navigate('/')
    }
  }, [ctx,navigate])
  return <NewAdForm />;
};

export default NewAd;
