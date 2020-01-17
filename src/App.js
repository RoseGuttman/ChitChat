import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>

    <header> 
      <img alt ="logo" src="https://img.icons8.com/cotton/2x/chat.png"/>
      ChitChat 
      
    </header>
    
    <TextInput onSend={t=> console.log(t)}/>

  </main>
}


function TextInput(props){
  const [text, setText] = useState('')

  return <div className="text-input">
  <input className="input" value={text}
    placeholder="chat"
    onChange={e=> setText(e.target.value)} />
  <button className="button" onClick={()=> {
    props.onSend(text)
    setText('')
  }}>
    <img alt="send" src="https://static.thenounproject.com/png/373675-200.png"/>
  </button>
  </div>
}

export default App;
