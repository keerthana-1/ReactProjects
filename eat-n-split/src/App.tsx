import React, { ReactNode, useState } from 'react';
import './index.css';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

interface Friend{
  id:number,
  name:string,
  image:string,
  balance:number
}

function App() {
  
  const [showAddFriend,setShowAddFriend]=useState(false)
  const [friends,setFriends]=useState(initialFriends)
  const [selectedFriend,setSelectedFriend] = useState(null)

  function handleShowAddFriend(){
      setShowAddFriend((showAddFriend)=> !showAddFriend)
  }

  function handleAddFriend(newfriend:{id:number,name:string,image:string,balance:number}){
    setFriends((friends)=>[...friends,newfriend])
  }

  function handleSelectedFriend(friend:any){
      //setSelectedFriend(friend)
      setSelectedFriend((selected:any)=> selected?.id === friend.id?null:friend)
      setShowAddFriend(false)
  }
 
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList data={friends} selectedFriend={selectedFriend} onSelect={handleSelectedFriend}></FriendsList>
        {
          showAddFriend && <AddFriendForm onAddFriend={handleAddFriend}></AddFriendForm>
        }

       <Button onClick={handleShowAddFriend}>{showAddFriend?"close":"Add friend"}</Button>
        
      </div>
       {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} key={(selectedFriend as {id:number}).id}></FormSplitBill>} 
    </div>
  );
}

function FriendsList({data,onSelect,selectedFriend}:any){
  return (
    <ul>
      {
        data.map((friend:{id:number,name:string,image:string,balance:number})=><Friend selectedFriend={selectedFriend} friend={friend} onSelect={onSelect} key={friend.id}></Friend>)
      }
    </ul>
  )
}

function Friend({friend,onSelect,selectedFriend}:any){

  const isSelected = selectedFriend?.id===friend.id

  return (
    <li className={isSelected?"selected":""}>
      <img src={friend.image} alt={friend.image}></img>
      <h3>{friend.name}</h3>

      {
        friend.balance < 0 &&  <p className='red'>you owe {friend.name} {Math.abs(friend.balance)}</p>
      }

      {
        friend.balance > 0 &&  <p className='green'>you  are owed {friend.name} {Math.abs(friend.balance)}</p>
      }

      {
        friend.balance === 0 &&  <p>you and {friend.name} are even</p>
      }
     
     <button className="button" onClick={()=>onSelect(friend)}>{isSelected?"close":"select"}</button>

    </li>
  )
} 


function Button({onClick,children}:{onClick():void,children:ReactNode}){
  return(
    <button className='button' onClick={onClick}>{children}</button>
  )
}

function AddFriendForm({onAddFriend}:{onAddFriend(friend:{id:number,name:string,image:string,balance:number}):void}){

  const [name,setName]=useState("")
  const [image,setImage]=useState("https://i.pravatar.cc/48")

 function handleAddFriend(e:any){
    e.preventDefault()

    if(!name || !image) return

    const id=Number(crypto.randomUUID())
    const newfriend={
      id,
      name,
      image: `${image}?=${id}`,
      balance:0
    }

    onAddFriend(newfriend)

    setName("")
    setImage("https://i.pravatar.cc/48")
 }

  return(
      <form className='form-add-friend'>
          <label>👫 Friend Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>

          <label>🌄 Image URL</label>
          <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}></input>

          <button className="button" onClick={handleAddFriend}>Add</button>
      </form>
  )
}

function FormSplitBill({selectedFriend,key}:any){

  const [bill,setBill]=useState(0)
  const [paidByUser,setPaidByUser]=useState(0)
  const paidByFriend = Number(bill)?Number(bill)-Number(paidByUser):""
  const [whoIsPaying,setWhoIsPaying] =useState("user")


  function handleSplitBill(){

  }

  return(
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))}></input>

      <label>🧍‍♂️ Your Expense</label>
      <input type="text" value={paidByUser} onChange={(e)=>setPaidByUser(Number(e.target.value)>bill? 0 : Number(e.target.value))}></input>

      <label>👫 {selectedFriend.name} Expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>🤑 Who's paying the bill</label>
      <select value={whoIsPaying} onChange={(e)=>setWhoIsPaying(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <button className="button" onClick={handleSplitBill}>Split Bill</button>
    </form>
  )
}

export default App;
