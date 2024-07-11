import React, { useState } from 'react';

import './index.css';

interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const initialItems=[
{id:1,description:"Passports",quantity:2,packed:false},
{id:2,description:"Socks",quantity:12,packed:false},
{id:3,description:"Charger",quantity:1,packed:false}]


function App() {

  const [items,setItems] = useState<Item[]>(initialItems);

  function handleItems(item:any){
    setItems((items)=> [...items,item])
  }

  function handleDeleteItem(id:number){
    setItems((items)=>items.filter(item => item.id !== id))
  }

  function handleToggleItem(id:number){
    setItems((items)=>items.map((item)=> item.id === id ? {...item,packed:!item.packed}  : item))
  }

  function handleClearList(){
    setItems([])
  }
  
  return (
    <div className="App">
      <Logo></Logo>
      <Form onAddItems={handleItems}></Form>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleToggleItem} onClearList={handleClearList}></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo(){

  return(
    <h1>🏝️ Far Away Travel List 🧳</h1>
  )
}

interface FormProps {
  onAddItems: (item: Item) => void;
}

function Form({onAddItems}:FormProps){

  const [description,setDescription]=useState<string>("");
  const [quantity,setQuantity]=useState<number>(1);

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();

    if(!description) return;

    const newItem={id:Date.now(),description,quantity,packed:false}
    console.log(newItem)
    
    onAddItems(newItem)

    setDescription("")
    setQuantity(1)
  }

  return (
    <form className='add-form' onClick={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
      {Array.from({length:20}, (_,i)=>i+1)
      .map((num)=> (<option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder='Item...' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  )
}

interface PackingListProps {
  items: Item[];
  onDeleteItem: (id:number) => void;
  onUpdateItem: (id:number) => void;
  onClearList: () =>void;
}

function PackingList({items, onDeleteItem, onUpdateItem, onClearList}:PackingListProps){
  const [sort,setSort]=useState('input');
  let sortedItems:Item[] =items;
  
  if(sort==='input') sortedItems=items;

  if(sort==='description') sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));

  if(sort==='packed') sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));

  return(
    <div className='list'>
      <ul>
        {
          sortedItems.map((item)=>(<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem}></Item>))
        }
      </ul>

        <div className='actions'>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="input">sort by input</option>
            <option value="description">sort by description</option>
            <option value="packed">sort by packed</option>
          </select>
          <button onClick={onClearList}>clear list</button>
        </div>

    </div>
  )
}

function Item({item,onDeleteItem,onUpdateItem}:any){
  return (
    <li><input type="checkbox" value={item.packed} onChange={()=>onUpdateItem(item.id)}></input>
    <span onClick={()=>onDeleteItem(item.id)} style={item.packed? {textDecoration:"line-through"}:{}}>
      {item.quantity} {item.description} ❌</span></li>
  )
}

function Stats({items}:{items:Item[]}){
  if (!items.length){
    return (
        <p className='stats'>
          <em>Start adding some items to your packing list</em>
        </p>

    )

  }

  const numItems:number=items.length;
  const packedItems:number = items.filter((item)=>(item.packed)).length;
  const percentPacked:number= Math.round((packedItems*100)/numItems);



  return (
    <footer className='stats'>
    <em>
      {percentPacked===100 ? "You packed everything. Ready to go." :
      `You have ${numItems} items on your list, and you already packed ${packedItems} (${percentPacked}%)`
    
      }
      </em>
      </footer>
  )
}

export default App;
