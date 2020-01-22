import React, {useState} from 'react'
import './App.css'
import { FiEdit2, FiSave } from "react-icons/fi"


function NamePicker(props){
    const[editName, setName] = useState('')
    const [showName, setShowName] = useState(false)
    
    
    return <div className="name">
      <input 
        className="name-input"
        style={{display: showName ? 'none' : 'flex'}}
        value={editName}
        placeholder="Set Username"
        onChange={e=> setName(e.target.value)}
        onKeyPress={e=> {
          if(e.key==='Enter') props.onSave(editName)
        }} />

      {showName && <div>{editName}</div>}
      <button 
        className="name-button"
        disabled={!editName}
        onClick={e=> {
          if(editName){
            props.onSave(editName)
            setShowName(!showName)
        }
      }}>
        {showName ?<FiEdit2/> : <FiSave/>}
    </button>
    </div>
}


export default NamePicker