import React, {useState} from 'react';
import './App.css';
import NamePicker from './name'

function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState()
  console.log(messages)
  return <main>

    <header> 
      <div style={{display:'flex', alignItems:'center'}}>
        <img alt ="logo" src="https://img.icons8.com/cotton/2x/chat.png"/>
        ChitChat 
      </div>
      <NamePicker onSave={setName} />
    </header>
    
    <div className="chat">
    {messages.map((m,i)=>{
      return <div key={i} className="messages-wrap">
          <div className="messages">{m}</div>
      </div>
    })}
    </div>

    <TextInput onSend={t=> 
      {setMessages([t, ...messages])}}/>

  </main>
}


function TextInput(props){
  const [text, setText] = useState('')

  return <div className="text-input">
  <input 
    className="input" value={text}
    placeholder="chat"
    onChange={e=> setText(e.target.value)} />
  <button 
    disabled={!text}
    className="button" 
    onClick={()=> {
    if(text) props.onSend(text)
    setText('')
  }}>
    <img alt="send" src="https://static.thenounproject.com/png/373675-200.png"/>
  </button>
  </div>
}

export default App;
