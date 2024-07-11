import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
     <Calculator></Calculator>
    </div>
  );
}

function Calculator(){
  const [bill,setBill]=useState(0)
  const [tip,setTip]=useState(0)
  const [ftip,setftip]=useState(0)

  function handleReset(){
    setBill(0)
    setTip(0)
    setftip(0)
  }

  return (
    <div>
      <p>How much was the bill?</p><input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))}></input>
      <p>How did you like the service?</p><Choices tip={tip} onTip={setTip}></Choices>
      <p>How did your friend like the service?</p><Choices tip={ftip} onTip={setftip}></Choices>
      <Totalbill bill={bill} tip={tip} ftip={ftip}></Totalbill>
      <button onClick={handleReset}>Reset</button>
    </div>
  )

}

function Totalbill({bill,tip,ftip}:{bill:number,tip:number,ftip:number}){

  const avg=(tip+ftip)/2
  const total=(bill*avg)/100
  return (
  <h1>You pay ${bill+total} (${bill} + ${total}) </h1>
  )
}

function Choices({tip,onTip}:{tip:number,onTip(tip:number):void}){
 return(
  <select value={tip} onChange={(e)=>onTip(Number(e.target.value))}>
    <option value='0'>Dissatisfied(0%)</option>
    <option value='5'>It was okay(5%)</option>
    <option value='10'>It was good(10%)</option>
    <option value='20'>Absolutely Amazing(20%)</option>
  </select>
 )

}

export default App;
