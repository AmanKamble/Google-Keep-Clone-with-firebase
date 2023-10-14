import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CreateArea from "./Components/CreateArea";
import Note from "./Components/Note";
import { app } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import { Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const auth = getAuth(app);
const db = getFirestore(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
const logoutHandler = () => {
  signOut(auth);
}

const App = () => {
  const [user, setUser] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "Notes"), (snap) => {
      const filteredDocs = snap.docs.filter((doc) => {
        const data = doc?._document?.data;
        const uid = data?.value?.mapValue?.fields?.uid?.stringValue;
        if (data && uid) {
          return user?.uid === uid;
        }
        return false; 
      });
      setNotes(filteredDocs);
    });
  }, [user]);
  

  const addNote = async (note) => {
    try {
      await addDoc(collection(db, "Notes"), {
        title: note.title,
        content: note.content,
        uid: user.uid,
        timestamp: serverTimestamp()
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteNote = async (id) => {
    const noteToDelete = notes[id];
    if (!noteToDelete) {
      return;
    }
    try {
      await deleteDoc(doc(db, "Notes", noteToDelete.id));
      const updatedNotes = notes.filter((note, index) => index !== id);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
  

  useEffect(() => {
    const loginUser = onAuthStateChanged(auth, (data) => {
      setUser(data)
    });
    return () => {
      loginUser();
    }
  }, [user]);

  return (
    <div className="app">
      <Header user={user} logoutHandler={logoutHandler} />
      {
        user ?
          (
            <>
              <CreateArea onAdd={addNote} />
              <div className="notesArea">
                {
                  notes.map((noteItem, index) => (
                    <Note
                      key={index}
                      id={index}
                      title={noteItem._document?.data?.value?.mapValue?.fields?.title?.stringValue}
                      content={noteItem._document?.data?.value?.mapValue?.fields?.content?.stringValue}
                      onDelete={deleteNote}
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <div className="loginButton">
              <Button onClick={loginHandler} variant="contained" style={{ display: "flex", gap: "2px", backgroundColor: '#ffb300', color: 'white' }} > <GoogleIcon />Sign In With Google</Button>
            </div>
          )
      }
      <Footer />
    </div>
  )
}

export default App
