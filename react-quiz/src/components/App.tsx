import React, { useEffect, useReducer } from 'react';
import DateCounter from './DateCounter';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import { StartScreen } from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';


export interface Ques{
  question:string;
  options: string[];
  correctOption: number;
  points: number;
  id:string;
}

const initialState:State={
  questions:[] as Ques[],
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaining:10
}

interface State{
  questions:Ques[];
  status:string;
  index:number;
  answer:number | null;
  points:number;
  highscore:number;
  secondsRemaining:number;
}

type Action=
  | {type:"dataReceived";payload:Ques[]}
  | {type:"dataFailed"}
  | {type:"start"}
  | {type:"newAnswer";payload:number}
  | {type:"nextQuestion"}
  | {type:"finish"}
  | {type:"restart"}
  | {type:"tick"};


function reducer(state:State,action:Action):State{

  switch(action.type){
    case "dataReceived":
      return {...state,questions:action.payload,status:"ready"};
    case "dataFailed":
      return {...state,status:"error"};
    case "start":
      return {...state,status:"active",secondsRemaining:state.questions.length*30};
    case "newAnswer":
      const question=state.questions.at(state.index)
      if (!question) {
        return state; 
      }
      return {...state,answer:action.payload,
        points:action.payload===question.correctOption ? state.points + question.points:state.points
      };
    case "nextQuestion":
      return {...state,index:state.index+1,answer:null}
    case "finish":
      return {...state,status:"finish", highscore: state.highscore < state.points ? state.points : state.highscore }
    case "restart":
      return {...initialState,questions:state.questions,status:"ready"};
    case "tick":
      return {...state, secondsRemaining:state.secondsRemaining-1, status:state.secondsRemaining==0?"finish":state.status}
    default:
      return state;
}

}

function App() {

  const [state,dispatch]=useReducer(reducer,initialState)

  const numQuestions=state.questions.length;

  const maxPossiblePoints=state.questions.reduce((prev,cur)=> prev+cur.points,0)

  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((res)=>res.json())
    .then((data)=> dispatch({type:"dataReceived",payload:data}))
    .catch((err)=> dispatch({type:"dataFailed"}));
  },[])

  
  return (
    <div className="app">
      {/* <DateCounter></DateCounter> */}

      <Header/>

      <Main>
        {state.status === "loading" && <Loader></Loader>}
        {state.status === "error" && <Error></Error>}
        {state.status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}></StartScreen>}
        {state.status === "active" && 
        <>
        <Progress index={state.index} numQuestions={numQuestions} points={state.points} maxPossiblePoints={maxPossiblePoints} answer={state.answer}></Progress>
        <Question question={state.questions[state.index]} answer={state.answer} dispatch={dispatch}></Question>

        <Footer>

        <Timer dispatch={dispatch} secondsRemaining={state.secondsRemaining}></Timer>
        <NextButton dispatch={dispatch} answer={state.answer} index={state.index} numOfQuestions={numQuestions}></NextButton> 
       
        </Footer>
        </>
        }

        {state.status === "finish" && 
        <FinishScreen points={state.points} maxPossiblePoints={maxPossiblePoints} highscore={state.highscore} dispatch={dispatch}></FinishScreen>
        }
      </Main>
    </div>
  );
}

export default App;
