import { ReactNode } from "react";

export function StartScreen({numQuestions,dispatch}:{numQuestions:ReactNode,dispatch:any}){
    return(
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} question to test your react mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Let's start</button>
        </div>
    )
}