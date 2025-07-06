import React from 'react'
import { useState } from 'react'

const App = () => {

const [Counter ,setCounter] = useState(0)

// let Counter = 0 

const addvalue = () =>{
  // Counter = Counter + 1
  // console.log(Counter);
  setCounter(Counter + 1)
}

const removevalue = () =>{
  // Counter = Counter - 1
  setCounter(Counter - 1);
  
}
  return (
    <div>
        <h1>container value is : {Counter} </h1>
        <button onClick={addvalue}>add value {Counter}</button> 
        <br/>
        <button onClick={removevalue}>Remove value {Counter}</button>
    </div>
  )
}

export default App
