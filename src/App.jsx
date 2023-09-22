import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    console.log(str)


  }, [length, numAllowed, charAllowed, setPassword])
  useEffect(() => {
    passGen()
  }, [length, numAllowed, charAllowed, passGen])

  const copyPass = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?f.setSelectionRange(0, 5)
    window.navigator.clipboard.writeText(password)
  }, [password])
  return (
    <div className="w-full h-screen text-white">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-cente my-3"> Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" ref={passwordRef} readOnly/>
          <button className="outline-none bg-blue-700 hover:bg-blue-600 duration-200 text-white px-3 py-0.5 shrink-0" onClick={copyPass}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={25} value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            className="cursor-posinter accent-orange-500"/>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id="numInput"
            defaultChecked={numAllowed}
            onChange={()=>{setNumAllowed((prev) => !prev)}}/>
            <label htmlFor="numInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" id="charInput"
            defaultChecked={charAllowed}
            onChange={() =>{setCharAllowed((prev) => !prev)}}/>
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
