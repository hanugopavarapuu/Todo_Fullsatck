import { useState } from "react";

interface Props {
    onAdd: (note: NoteType) => void;
}

interface NoteType {
    title: string;
    content: string;
}

function CreateArea({ onAdd }: Props) {
    const [note, setNote] = useState<NoteType>({ title: "", content: "" });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setNote(prevNote => ({ ...prevNote, [name]: value }));
    }

    function submitNote(event: React.FormEvent) {
        event.preventDefault();
        
        // Validate that both title and content are not empty
        if (note.title.trim() === "" || note.content.trim() === "") {
            return;
        }
        
        onAdd(note);
        setNote({ title: "", content: "" });
    }

    return (
        <div className="create-area">
            <h2>Create New Note</h2>
            <form onSubmit={submitNote}>
                <input 
                    name="title" 
                    onChange={handleChange} 
                    value={note.title} 
                    placeholder="Title" 
                />
                <textarea 
                    name="content" 
                    onChange={handleChange} 
                    value={note.content} 
                    placeholder="Take a note..." 
                />
                <button type="submit">Add Note</button>
            </form>
        </div>
    );
}

export default CreateArea;