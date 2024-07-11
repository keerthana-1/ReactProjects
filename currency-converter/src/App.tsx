import React, { useEffect, useState } from 'react';


function App() {
  return (
    <div className="App">
      <CurrencyConverter></CurrencyConverter>
    </div>
  );
}

function CurrencyConverter(){

  const [amount,setAmount] = useState(1)
  const [fromAmount,setFromAmount] = useState("EUR")
  const [toAmount,setToAmount] = useState("USD")
  const [convertedAmount,setConvertedAmount] = useState(0)


  useEffect(function(){

    async function fetchCurrencyDetails(){

     
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromAmount}&to=${toAmount}`)
      const data = await res.json()
      console.log(data.rates)
      setConvertedAmount(data.rates[toAmount])
      

    }
    if(fromAmount === toAmount) setConvertedAmount(amount)
    fetchCurrencyDetails();

  },[amount,fromAmount,toAmount])

  return(
    <div>
      <input type="text" value={amount} onChange={(e)=>setAmount(Number(e.target.value))}></input>
      <select value={fromAmount} onChange={(e)=>setFromAmount(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
      </select>

      <select value={toAmount} onChange={(e)=>setToAmount(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
            <option value="KRW">KRW</option>
      </select>

      <p>{convertedAmount}{toAmount}</p>

    </div>
  )

}

export default App;
