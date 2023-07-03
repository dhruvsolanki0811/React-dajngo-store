import { useState } from "react";


const useInputHandler = (state) => {
  const [inputState, setInputState] = useState(state);
  const inputUpdate = (e) => {
    const inpValue = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: inpValue,
    });
  };
  return { inputState, inputUpdate };
};



export { useInputHandler,};