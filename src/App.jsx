import 'tailwindcss/tailwind.css';
import './style.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  // State definition
  const [selectFrom, setSelectFrom] = useState('');
  const [input, setInput] = useState('');
  const [toCur , setToCur] = useState('');
  const [result, setResult] = useState('');
  const [currency , setCurrency] = useState([]);


  // definning functions for state
  const selectFromHandler = (e) =>{
    setSelectFrom(e.target.value)
  };
// 
const inputHandler = (e) =>{
  setInput(e.target.value)
};
// 

// 
const toCurHandler = (e)=>{
  setToCur(e.target.value)
};
useEffect(()=>{
  currencyHandler();
},[])
// Consuming  API 
const config = {headers:'apikey:Z5DCFr3bOYsHuDP5owbIew5n6UKf7v1J'}
// 
const resultHandler = async ()=>{
  const fetch = await axios.get(`https://api.apilayer.com/fixer/convert?to=${toCur}&from=${selectFrom}&amount=${input}`,config);
  console.log(fetch)
  setResult(fetch)
};
const currencyHandler = async () =>{
  const fetch = await axios.get(`https://api.apilayer.com/fixer/convert?to=${toCur}&from=${selectFrom}&amount=${input}`,config);
  const testCur = (fetch.data.symbol);
  const arr = [];
  for( const [key,value] of Object.entries(testCur)){
  const obj = {key,value}
  arr.push(obj)
  }
  setCurrency(arr);
  console.log(arr)

}

// returning App
return (
    <div className="App w-max m-auto shadow-xl shadow-yellow-900 ">
        <div className=' text-center mt-20 p-20'>
              <h1 className='text-4xl font-bold text-white text-center mb-4'>Currency Converter</h1>
              <p className='mt-4 mb-4 font-bold'>From</p>
              <select className='text-green-500 py-4 px-8 outline-none rounded-tl-xl rounded-bl-xl' onChange={selectFromHandler}>
                <option disabled className=''> Select Country</option>
                {
                    currency.map((symb=><option value={symb.key} keys={symb.value}>{symb.value}</option> ))
                }
              </select>
              <input type='number' onChange={inputHandler} className=' py-3 px-16 rounded-tr-xl rounded-br-xl text-blue-400 border-b-0 outline-none' /><br/>
              {/* For to currency  */}
              <p className='mt-4 mb-4 font-bold'>To</p>
              <select className='py-4 px-8 mt-10 text-green-500 rounded-tl-xl rounded-bl-xl ' onChange={toCurHandler}>
                <option > Select Country</option>
                {
                    currency.map((symb=><option value={symb.key} keys={symb.value}>{symb.value}</option> ))
                }
              </select>
              <input type='number' value={result} className='  py-3 px-16 rounded-tr-xl rounded-br-xl text-blue-400 border-b-0 outline-none' /><br/>
              <br/>
              <button className='btn p-2 bg-green-700 rounded-md text-white font-bold' onClick={resultHandler}>Convert</button>
        </div>
        
    </div>
  );
}

export default App;
