import React, { ReactNode, useState } from 'react';
import "./index.css";
import { JsxElement } from 'typescript';

const messages=[
  "Learn react 👩‍💻",
  "Apply for Jobs 💼",
  "Invest your new income 🤑"
]

function App() {

  const [step, setStep]=useState(1);
  const [isOpen,setIsOpen]=useState(true);

  function handlePrevious():void{
    
   if(step>1)  {setStep((step)=>step-1) }
  }

  function handleNext():void{

    if(step<3) { setStep((step) => step+1) }
  }

  return (
  <>
    <button className="close" onClick={()=> setIsOpen(!isOpen)}>&times;</button>

  { 
    isOpen &&    
    <div className="steps">
    <div className="numbers">
      <div className={step>=1 ? 'active':''}>1</div>
      <div className={step>=2 ? 'active':''}>2</div>
      <div className={step>=3 ? 'active':''}>3</div>
    </div>

    <p className="message">Step {step}: {messages[step-1]}</p>

    <div className="buttons">
      <Button bgColor={"#7950f2"} textColor={"#fff"} onClick={handlePrevious}><span>👈</span>Previous</Button>
      <Button bgColor={"#7950f2"} textColor={"#fff"} onClick={handleNext}>Next<span>👉</span></Button>
      
      </div>
  </div>}
  </>
    
  );
}

function Button({bgColor,textColor,onClick,children}:{bgColor:string,textColor:string,onClick:()=>void,children:ReactNode}){

  return (
 
    <button style={{backgroundColor:bgColor, color:textColor}} onClick={onClick}>{children}</button>
     
  )
}

export default App;
