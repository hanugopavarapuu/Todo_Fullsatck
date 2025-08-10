import { Router } from "express";
import { todo } from "../types";
import { Note } from "../models/Note";
import { authmiddleware } from "../middleware";
const route = Router();

route.post("/addnote", async (req, res) => {
    try {
        const parsedData = todo.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ msg: `invalid input on note` });
            return;
        }
        const { title, content } = parsedData.data;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(200).json({ newNote })

    } catch (e) {
        res.status(500).json({ msg: `server down ${e}` })
    }
});
route.get("/list", async (req, res) => {
    try {
        const result = await Note.find();
        res.status(200).json({ result });
    } catch (e) {
        res.status(500).json({ msg: `server down ${e}` });
    }
})
route.delete("/del/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: `deleted` })


    } catch (e) {
        res.status(500).json({ msg: `server down` });
    }
})

route.put("/update/:id", async (req, res) => {
    try {
        const parsedData = todo.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({ msg: `invalid input on note` });
            return;
        }
        const { title, content } = parsedData.data;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            res.status(404).json({ msg: `note not found` });
            return;
        }
        res.status(200).json({ updatedNote });
    } catch (e) {
        res.status(500).json({ msg: `server down ${e}` });
    }
});

export default route;
