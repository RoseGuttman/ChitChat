import React, {useState, useEffect, useRef} from 'react'
import './App.css'
import { FiEdit2, FiSave } from "react-icons/fi"


function NamePicker(props){
    const[name, setName] = useState('')
    const [showName, setShowName] = useState(false)
    const inputE1 = useRef(null)
    
    function save(){
      setTimeout(()=>{
        inputE1.current.focus()
      }, 50)
      if(name && !showName) {
        props.onSave(name)
        localStorage.setItem('name',name)
      }
      setShowName(!showName)
    }
  
    useEffect(()=>{
      const n = localStorage.getItem('name')
      if(n) {
        setName(n)
        setTimeout(()=>{
          save()
        },50)
      
      }
    }, [])
    
    return <div className="edit-username">
      <div className="namebutton">
      <input 
        className="name-input"
        style={{display: showName ? 'none' : 'flex'}}
        value={name}
        ref={inputE1}
        placeholder="Set Username"
        onChange={e=> setName(e.target.value)}
        onKeyPress={e=> {
          if(e.key==='Enter') save()
        }} />

      {showName && <div>{name}</div>}
      <button 
        className="name-button"
        onClick={save}>
        {showName ?<FiEdit2/> : <FiSave/>}
    </button>
    </div>
    </div>
}


export default NamePicker