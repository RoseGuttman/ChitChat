import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './name'
import {db, useDB} from './db'
import { FiSend } from "react-icons/fi"
import { BrowserRouter, Route } from 'react-router-dom'

function App(){
  useEffect(()=> {
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)


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
      return <div key={i} className="messages-wrap" 
      from={m.name===name?'me':'you'}>
            <div className="msg">{m.text}</div>
            <div className="msg-name">{m.name}</div>
      </div>
    })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
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
