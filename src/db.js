import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyAGjiuGYOvdiohw5SVle0fUmr4QdWVkoG4",
    authDomain: "chitchat2020-f0147.firebaseapp.com",
    databaseURL: "https://chitchat2020-f0147.firebaseio.com",
    projectId: "chitchat2020-f0147",
    storageBucket: "chitchat2020-f0147.appspot.com",
    messagingSenderId: "330838545786",
    appId: "1:330838545786:web:e2987c68993ff1b25eb2c3",
    measurementId: "G-58L1WG13GF"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()