import mongoose, { Schema, Document } from "mongoose";



const notesschema = new Schema({
    title: String,
    content: String,
});

export const Note = mongoose.model("Note", notesschema);
