import { useState } from "react";
const useDoubleInput = (validateValues,initialFirst="",initialSecond="") => {
  const [enteredFirstValue, setEnteredFirstValue] = useState(initialFirst);
  const [firstIsTouched, setfirstIsTouched] = useState(false);

  const [enteredSecondValue, setEnteredSecondValue] = useState(initialSecond);
  const [secondIsTouched, setsecondIsTouched] = useState(false);
  const isInvalid = validateValues(enteredFirstValue,enteredSecondValue) && (firstIsTouched || secondIsTouched);

  const FirstChangeHandler = (event) => {
    setEnteredFirstValue(event.target.value);
  };

  const SecondChangeHandler = (event) => {
    setEnteredSecondValue(event.target.value);
  };

  const FirstBlurHandler = () => {
    setfirstIsTouched(true);
  };

  const SecondBlurHandler = () => {
    setsecondIsTouched(true);
  };

  const reset= ()=>{
      setEnteredFirstValue('');
      setfirstIsTouched(false);

      setEnteredSecondValue('');
      setsecondIsTouched(false);
  }

  return {
    isInvalid: isInvalid,
    firstValue: enteredFirstValue,
    FirstChangeHandler,
    FirstBlurHandler,
    secondValue: enteredSecondValue,
    SecondChangeHandler,
    SecondBlurHandler,
    reset,
  };
};

export default useDoubleInput;
