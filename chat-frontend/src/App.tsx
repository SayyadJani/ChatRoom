import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [allMsg,setallMsg ]=useState(["hi there ","hello"]);

  const wsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=>{
    const wss = new WebSocket("ws://localhost:8080");

    wss.onmessage=(event)=>{
      setallMsg((x)=>[...x,event.data]);
    }

    wsRef.current = wss;

    wss.onopen=()=>{
      wss.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red",
        }
      }))
    }

  },[])

  function sendMsg(){
    const message = inputRef.current.value;

    if(!message) return ;

    wsRef.current?.send(JSON.stringify({
      type:"chat",
      payload:{
        message:message,
      }
    }))

    inputRef.current.value = "";
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">

      <div className="p-4 text-white text-xl font-semibold border-b border-white-200">
        🔴 Room: Red Chat
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {allMsg.map((messages, i) => (
          <div key={i} className="flex">
            <div className="bg-gray-100 text-black rounded-2xl px-5 py-3 max-w-[70%] shadow">
              {messages}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 p-4 bg-gray-900 border-t border-gray-800">
        <input
          ref={inputRef}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          onClick={sendMsg}
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-full font-medium shadow-lg"
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default App
