export default function FinishScreen({points,maxPossiblePoints,highscore,dispatch}:{points:number,maxPossiblePoints:number,highscore:number,dispatch:any}){

    const percentage=(points/maxPossiblePoints)*100;
    return (
        <>
        <p className="result">
            you scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">High Score : {highscore} points</p>

        <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart Quiz!
        </button>
        </>
    )
}