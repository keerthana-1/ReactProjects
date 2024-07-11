import { useState } from "react";

function App() {
  return (
    <div style={{textAlign:"center"}} className="App">
     <Counter></Counter>
    </div>
  );
}

function Counter(){
  
  const [count,setCount]=useState(0)
  const [step,setStep]=useState(1)
  const date = new Date("june 25 2024")
  date.setDate(date.getDate()+count)

  return (
  <> 
    <div>
    
    <input type="range" min="0" max="10" value={step} onChange={(e)=>setStep(Number(e.target.value))}></input>
    Step: {step}
    
    </div>

    <div>
    <button onClick={()=> setCount((c)=>c-step)}>-</button>
     <input type="text" onChange={(e)=>setCount(Number(e.target.value))}></input>
    <button onClick={()=> setCount((c) => c+step)}>+</button>
    </div>

    <div>
      <p> <span>
        
        {count===0? "Today is " : count>0 ? `${Math.abs(count)} days from day is ` : `${Math.abs(count)} days ago day is `}
        
      </span>


      <span>{date.toDateString()}</span></p>
    </div>
  </>
    
  )
}

export default App;
