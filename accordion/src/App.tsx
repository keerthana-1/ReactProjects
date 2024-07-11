import React, { useState } from 'react';
import './style.css';

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet. Aut quidem omnis est consequatur corporis vel repellendus officia? Qui mollitia cumque cum eveniet itaque sed laudantium laboriosam ut praesentium commodi.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Id magni dolorem est error aperiam ut doloremque dolor vel quod dolore eum quidem minus est illo amet et eaque accusamus!",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Et assumenda iste aut vero quidem et enim rerum et adipisci dolores est quasi numquam. Et minus labore sit quidem recusandae vel dolor quisquam rem itaque fugit.",
  },
];

function App() {
  return (
    <div className="App">
      <Accordion data={faqs}></Accordion>
    </div>
  );
}


function Accordion({data}: { data: { title: string; text: string; }[]; }){
  const [curopen,setCurOpen]=useState(null)

  return(
    <div className="accordion">
      {
        data.map((item,i)=>(<AccordionItem curOpen={curopen} onOpen={setCurOpen} num={i} title={item.title} key={i}>{item.text}</AccordionItem>))
      }
    </div>
  )
}

function AccordionItem({curOpen,onOpen,num,title,key,children}:{ curOpen:any,onOpen:any,children: string; num: number; title: string; key:number }){

  const isopen=num===curOpen

  function handleToggle(){
     onOpen(isopen?null:num)
  }
  return(
    <div className={`item ${isopen? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isopen?'-':"+"}</p>
      { isopen && <div className="content-box">{children}</div>}
    </div>
  )
}
export default App;
