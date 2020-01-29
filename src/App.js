import React, {useState, useEffect} from 'react';
import './App.css';
import './media.css'
import NamePicker from './name'
import {db, useDB} from './db'
import { BrowserRouter, Route } from 'react-router-dom'
import { FiSend, FiCamera } from 'react-icons/fi'
import Camera from 'react-snap-pic'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import Div100vh from 'react-div-100vh'

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
  const [showCamera, setShowCamera] = useState(false)

  async function takePicture(img){
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7) //random ID for our image
    var storageRef = firebase.storage().ref() //Making refrence in storage
    var ref = storageRef.child(imgID + '.jpg') //creating child of that refrence
    await ref.putString(img, 'data_url') //uploading image, specifying type
    db.send({ img: imgID, name, ts: new Date(), room }) //sending image along with everything else
  }



  return <Div100vh>

  {showCamera && <Camera takePicture={takePicture} />}

    <header> 
      <div style={{display:'flex', alignItems:'center'}}>
        <img alt ="logo" src="https://img.icons8.com/cotton/2x/chat.png"/>
        ChitChat 
      </div>
      <div className="username"><NamePicker onSave={setName} /></div>
    </header>
    
    <div className="messages">
    {messages.map((m,i)=> <Message key={i} m={m}  name = {name}/>)}
    </div>

    <TextInput 
      showCamera={()=>setShowCamera(true)}
      onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })}}
      />

  </Div100vh>

    }

    const bucket = 'https://firebasestorage.googleapis.com/v0/b/chitchat2020-f0147.appspot.com/o/'
    const suffix = '.jpg?alt=media'
  
function Message({m, name}){
  return <div className="messages-wrap" 
  from={m.name===name?'me':'you'}>
    <div className="message">
        <div className="msg-name">{m.name}</div>
        <div className="msg-text">{m.text}</div>
        {m.img && <img src={bucket+m.img+suffix} alt="pic" /> }
    </div>
  </div>
}


function TextInput(props){
  const [text, setText] = useState('')
  
  return <div className="text-input-wrap">
    <button onClick={props.showCamera}
      style={{position:'absolute', left: 2, top: 10, background:'transparent',
      color:'white', height: 29, padding: 4}}>
      <FiCamera style={{height:15, width:15}} />
    </button>
    
    <input 
      className="text-input" value={text}
      placeholder="Chat"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
      }
    }} />
  
    <button 
      onClick={()=> {
      if(text) props.onSend(text)
      setText('')
      }}
      className="button"
      disabled={!text}>
      <FiSend/>
    </button>
  </div>
}



export default App;
