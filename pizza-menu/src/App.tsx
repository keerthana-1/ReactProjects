import React from 'react';
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}

function Header(){

    const style={color:'red',fontSize:"48px"}
  return(
    <header className="header">
    <h1>Fast React Pizza Co.</h1>
    </header>
  )
}

//ternary operator
function Menu(){
  const pizzas = pizzaData
  const numPizzas:number=pizzas.length
  return (
    <main className='menu'>
      <h2>Our Menu</h2>
     
      {
        numPizzas>0 ?
        <>
        <p> Authentic Italian Cuisine. 6 creative dishes to choose from. </p>
        <ul className='pizzas'>
        {
          pizzaData.map((item)=>(
            <Pizza pizzaObj={item} key={item.name}></Pizza>
          ))
        }
        </ul>
        </>
        : <p>we are still working on our menu. please come back later.</p>
      }
     
    </main>
  )
}

//multiple returns
function Footer(){

  const hours:number = new Date().getHours()
  const openTime:number = 12
  const closeTime:number = 22
  const isOpen:boolean = hours>=openTime && hours<=closeTime;

  // if(isOpen){
  //   return <p>We are happy to welcome you between {openTime}:00 and {closeTime}:00</p>
  // }
  return ( 
     <footer className="footer">
      {
        isOpen ?
        <div className='order'> 
          <p>We are open until {closeTime}:00. order online or come and visit us!</p>
          <button className='btn'>Order</button>
        </div>
        : <p>We are happy to welcome you between {openTime}:00 and {closeTime}:00</p>
      }
      </footer>
    
   
  )
}

function Pizza({pizzaObj}:any){ //Destructuring props

 // if(pizzaObj.soldOut) { return null }

  return (

    <li className={`pizza ${pizzaObj.soldOut? "sold-out":""}`}>
    <img src={pizzaObj.photoName}></img>
    <div>
    <h3>{pizzaObj.name}</h3>
    <p> {pizzaObj.ingredients} </p>
    <span>{pizzaObj.soldOut ? "Sold Out" : pizzaObj.price}</span>
    </div>
    </li>
  )
}

export default App;
