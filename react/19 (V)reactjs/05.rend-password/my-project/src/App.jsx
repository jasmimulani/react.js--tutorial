import React from 'react'
import { useState, useCallback ,useEffect ,useRef} from 'react'

const App = () => {

  const [length, setlength] = useState(8)

  const [number, setnumber] = useState(false)

  const [char, setchar] = useState(false)

  const [pass, setpass] = useState(" ")


  // ref hook

  const passwordref = useRef(null)

  const Passgenteror = useCallback(() => {
    let Password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += '0123456789'
    if (char) str += '~!@#$%^&*(){}[]?'

    for (let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      Password += str.charAt(char)
    }

    setpass(Password)


  }, [length, number, char, setpass])

  const copypasswordtoclipbord = useCallback(() => {
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(pass)
  } ,[pass])

   useEffect(() => {
    Passgenteror()
   }, [length,number,char ,Passgenteror])

  


  return (
    <div>
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 marker: my-8 text-orange-500 bg-slate-700'>
        <h1 className='text-white text-center my-3'>Password genteror</h1>
        <div className='flex shadow-lg overflow-hidden mb-4 rounded-lg'>
          <input type="text"
            value={pass}
            className='outline-none w-full py-1 px-3'
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button onClick={ copypasswordtoclipbord} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className=' cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} />
            <label> length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={number}
              id='numberinput'
              onChange={() => {
                setnumber((prev) => !prev)
              }} />
            <label htmlFor="numberinput">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={char}
              id='charinput'
              onChange={() => {
                setchar((prev) => !prev)
              }} />
            <label htmlFor="numberinput">Characters</label>
          </div>


        </div>
      </div>
    </div>
  )
}

export default App
