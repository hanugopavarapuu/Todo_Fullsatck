
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors());

mongoose.connect("mongoDB_URL");

const todoschema = new mongoose.Schema({
  item: String,
  description: String,
});
const todotable = mongoose.model('todotable', todoschema);

app.post("/api/v1/addtodo", (req, res) => {
  const { item, description } = req.body;

  if (!item || !description) {
    res.send("Enter inputs");
  } else {
    const newtodo = new todotable({ item, description });
    newtodo.save();
    res.send(newtodo._id);
  }
});

app.get("/api/v1/todolist", async (req, res) => {
  const todolist = await todotable.find({});
  res.json({ todolist });
});

app.put('/api/v1/todoupdate/:id', async (req, res) => {
  const id = req.params.id;
  const { item, description } = req.body;

  try {
    const updatedTodo = await todotable.findByIdAndUpdate(
      id,
      { item, description },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).send("Error updating the todo");
  }
});

app.delete('/api/v1/deletetodo/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await todotable.findByIdAndDelete(id);
    res.send("Todo deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting the todo");
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
