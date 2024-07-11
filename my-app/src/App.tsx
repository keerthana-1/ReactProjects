import React from "react";

function App(){
    async function getAdvice(){
      const res=await fetch("https://api.adviceslip.com/advice")
      const data=await res.json()
      console.log(data.slip.advice)
    }


    return (
      <div className="App">
        <h1>Hello World</h1>
        <button onClick={getAdvice}>Get advice</button>
      </div>
    );
  }
  
  export default App;