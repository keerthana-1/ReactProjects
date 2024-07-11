import { useState, ChangeEvent, useReducer ,MouseEvent} from "react";

interface State {
  count: number;
  step: number;
}

const initialState={count:0,step:1}

type Action =
  | { type: "dec" }
  | { type: "inc" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

function reducer(state:State,action:Action){
  console.log(state,action)
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return {...state,step:action.payload};
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}


function DateCounter() {

  const [state,dispatch]=useReducer(reducer,initialState);
  const {count,step}=state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function (event: MouseEvent<HTMLButtonElement>) {
    dispatch({type:'dec'});
   
  };

  const inc = function (event: MouseEvent<HTMLButtonElement>) {
    dispatch({type:"inc"});
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  const defineCount = function (e :ChangeEvent<HTMLInputElement>) {
    dispatch({type:"setCount",payload:Number(e.target.value)})
    //setCount(Number(e.target.value));
  };

  const defineStep = function (e:ChangeEvent<HTMLInputElement>) {
    dispatch({type:"setStep",payload:Number(e.target.value)})
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type:"reset"})
    //setCount(0);
    //setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
