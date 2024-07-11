import { useEffect } from "react"

export default function Timer({dispatch,secondsRemaining}:{dispatch:any,secondsRemaining:number}){

    const mins=Math.floor(secondsRemaining/60)
    const sec=secondsRemaining%60

    useEffect(function(){
        const id=setInterval(function() {
            dispatch({type:"tick"})
        },1000);
        
        return() => clearInterval(id);

    },[dispatch])


    return(
        <div className="timer">{mins<10 && "0"}{mins}:{sec<10 && "0"}{sec}</div>
    )
}