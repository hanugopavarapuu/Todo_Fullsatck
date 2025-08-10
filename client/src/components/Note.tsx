import { useState } from "react";

interface NoteProps {
    id: string;
    title: string;
    content: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedNote: { title: string; content: string }) => void;
}

function Note({ id, title, content, onDelete, onUpdate }: NoteProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editContent, setEditContent] = useState(content);

    const handleUpdate = () => {
        onUpdate(id, { title: editTitle, content: editContent });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(title);
        setEditContent(content);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="note">
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Content"
                />
                <div className="button-group">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleUpdate}>Save</button>
                </div>
            </div>
        );
    }

    return (
        <div className="note">
            <h3>{title}</h3>
            <p>{content}</p>
            <div className="button-group">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
}

export default Note;