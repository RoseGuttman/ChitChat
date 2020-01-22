import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './name'
import {db} from './db'
import { FiSend } from "react-icons/fi"

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')

  useEffect(()=>{
    db.listen({
      receive: m=> {
        setMessages(current=> [m, ...current])
      },
    })
  }, [])


  console.log(messages)
  return <main>

    <header> 
      <div style={{display:'flex', alignItems:'center'}}>
        <img alt ="logo" src="https://img.icons8.com/cotton/2x/chat.png"/>
        ChitChat 
      </div>
      <div className="username"><NamePicker onSave={setName} /></div>
    </header>
    
    <div className="chat">
    {messages.map((m,i)=>{
      return <div key={i} className="messages-wrap">
          <div className="messages">{m.text}</div>
      </div>
    })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date()
      })}}/>

  </main>
}


function TextInput(props){
  const [text, setText] = useState('')
  
  return <div className="text-input">
  <div className="bar">
  <input 
    className="input" value={text}
    placeholder="Chat"
    onChange={e=> setText(e.target.value)} />
  <button 
    disabled={!text}
    className="button" 
    onClick={()=> {
    if(text) props.onSend(text)
    setText('')
  }}>
    <FiSend/>
  </button>
  </div>
  </div>
}

export default App;
