import React, { useEffect, useState } from 'react';

interface Slip{
  id:number;
  advice:string;
}

interface AdviceSlip{
  slip:Slip;
}

function App() {

   const [advice,setAdvice] = useState("")
   const [count,setCount] = useState(0)

  async function getAdvice(){
    const res : Response = await fetch("https://api.adviceslip.com/advice")
    const data:AdviceSlip = await res.json()
    const ad:string=data.slip.advice
    setAdvice(ad)
    setCount((c)=>c+1)
  }

  useEffect(function(){
    getAdvice()
  },[])

  return (
    <div className="App">
      <h1>{advice}</h1>
      <button onClick={getAdvice}>get advice</button>
      <Message count={count}></Message>
    </div>
  );
}


function Message(props:any){
  return (
    <p>
      you have read <strong>{props.count}</strong> pieces of advice
    </p>
  )
}

export default App;
