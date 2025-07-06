import { useState } from 'react'
import './App.css'

function App() {
  const [color , setcolor] = useState("olive")
  return (
    <div className=' w-full h-screen duration-200' style={{background: color}}>

      <div className=' fixed flex flex-wrap  justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap gap-3 justify-center shadow-xl bg-white px-3 py-2 rounded-xl'>
           <button   onClick={() => setcolor("red")}  className='outline-none px-4 py-1 rounded-full text-white shadow-xl' style={{background:"red"}}>Red</button>

           <button  onClick={() => setcolor("yellow")}
          className='outline-none px-4 py-1 rounded-full  shadow-xl' style={{background:"yellow"}}>yellow</button>

           <button onClick={() => setcolor("green")} className='outline-none px-4 py-1 rounded-full text-white shadow-xl' style={{background:"green"}}>green</button>

           <button  onClick={() => setcolor("blue")} className='outline-none px-4 py-1 rounded-full text-white shadow-xl' style={{background:"blue"}}>blue</button>

           <button  onClick={() => setcolor("pink")} className='outline-none px-4 py-1 rounded-full text-white shadow-xl' style={{background:"pink"}}>pink</button>

           <button  onClick={() => setcolor("purple")} className='outline-none px-4 py-1 rounded-full text-white shadow-xl' style={{background:"purple"}}>purple</button>
        
        </div>
       </div>
    </div>
  )
}

export default App
