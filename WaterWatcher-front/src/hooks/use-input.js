import { useState } from "react";
const useInput = (validateValue,initialValue="") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [IsTouched, setIsTouched] = useState(false);

  const isInvalid = validateValue(enteredValue) && IsTouched;

  const ChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const BlurHandler = () => {
    setIsTouched(true);
  };

  const setTouched=(boolean)=>{
    setIsTouched(boolean);
  }

  const reset= ()=>{
      setEnteredValue('');
      setIsTouched(false);
  }

  return {
    value: enteredValue,
    isInvalid: isInvalid,
    ChangeHandler,
    BlurHandler,
    setTouched,
    reset,
  };
};

export default useInput;
