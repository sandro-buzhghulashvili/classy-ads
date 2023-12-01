import { useState } from 'react';

const useInput = (validatorFunction) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const hasError = isTouched && validatorFunction(value);
  const isValid = !validatorFunction(value);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  return {
    value,
    hasError,
    valueChangeHandler,
    blurHandler,
    isValid,
  };
};

export default useInput;
