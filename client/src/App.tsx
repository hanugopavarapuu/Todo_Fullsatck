import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import CreateArea from "./components/CreateArea";
import Note from "./components/Note";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "./api/axios";

interface NoteType {
  _id: string;
  title: string;
  content: string;
}

function AppContent() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/note/list");
        setNotes(res.data.result);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (note: Omit<NoteType, "_id">) => {
    try {
      const res = await axios.post("/note/addnote", note);
      setNotes(prev => [...prev, res.data.newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`/note/del/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (id: string, updatedNote: Omit<NoteType, "_id">) => {
    try {
      const res = await axios.put(`/note/update/${id}`, updatedNote);
      setNotes(prev => prev.map(note => 
        note._id === id ? res.data.updatedNote : note
      ));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <CreateArea onAdd={addNote} />
        <div className="notes-grid">
          {notes.map(note => (
            <Note 
              key={note._id} 
              id={note._id} 
              title={note.title} 
              content={note.content} 
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

