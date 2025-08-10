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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching notes from:", axios.defaults.baseURL);
        const res = await axios.get("/note/list");
        console.log("Notes response:", res.data);
        setNotes(res.data.result);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (note: Omit<NoteType, "_id">) => {
    try {
      console.log("Adding note:", note);
      const res = await axios.post("/note/addnote", note);
      console.log("Add note response:", res.data);
      setNotes(prev => [...prev, res.data.newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
      setError("Failed to add note");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      console.log("Deleting note:", id);
      await axios.delete(`/note/del/${id}`);
      setNotes(prev => prev.filter(note => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      setError("Failed to delete note");
    }
  };

  const updateNote = async (id: string, updatedNote: Omit<NoteType, "_id">) => {
    try {
      console.log("Updating note:", id, updatedNote);
      const res = await axios.put(`/note/update/${id}`, updatedNote);
      console.log("Update note response:", res.data);
      setNotes(prev => prev.map(note => 
        note._id === id ? res.data.updatedNote : note
      ));
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update note");
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {error && (
          <div style={{ 
            background: 'red', 
            color: 'white', 
            padding: '10px', 
            margin: '10px', 
            borderRadius: '5px' 
          }}>
            Error: {error}
          </div>
        )}
        <CreateArea onAdd={addNote} />
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading notes...
          </div>
        ) : (
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
        )}
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

