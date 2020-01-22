import React, {useState, useEffect} from 'react'
import './App.css'
import { FiEdit2, FiSave } from "react-icons/fi"


function NamePicker(props){
    const[editName, setName] = useState('')
    const [showName, setShowName] = useState(false)
    
    function save(){
      if(editName && !showName) {
        props.onSave(editName)
        localStorage.setItem('name',editName)
      }
      setShowName(!showName)
    }
  
    useEffect(()=>{
      const n = localStorage.getItem('name')
      if(n) {
        setName(n)
        save() 
      }
    }, [])
    
    return <div className="name">
      <div className="namebutton">
      <input 
        className="name-input"
        style={{display: showName ? 'none' : 'flex'}}
        value={editName}
        placeholder="Set Username"
        onChange={e=> setName(e.target.value)}
        onKeyPress={e=> {
          if(e.key==='Enter') save()
        }} />

      {showName && <div>{editName}</div>}
      <button 
        className="name-button"
        onClick={save}>
        {showName ?<FiEdit2/> : <FiSave/>}
    </button>
    </div>
    </div>
}


export default NamePicker