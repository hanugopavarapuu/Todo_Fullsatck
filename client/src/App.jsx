import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [input, setinput] = useState({ item: "", des: "" });
  const [items, setitems] = useState([]);

  function hchange(event) {
    const { name, value } = event.target;
    setinput((preval) => ({ ...preval, [name]: value }));
  }

  async function fetch() {
    const res = await axios.get("http://localhost:5000/api/v1/todolist");
    setitems(res.data.todolist);
  }

  async function hclick() {
    await axios.post("http://localhost:5000/api/v1/addtodo", {
      item: input.item,
      description: input.des,
    });
    setinput({ item: "", des: "" });
    fetch();
  }

  async function update(id) {
    const updateitem = prompt("Enter updated title:");
    const updatedes = prompt("Enter updated description:");
    if (updateitem && updatedes) {
      await axios.put(`http://localhost:5000/api/v1/todoupdate/${id}`, {
        item: updateitem,
        description: updatedes,
      });
      fetch();
    }
  }

  async function delet(id) {
    await axios.delete(`http://localhost:5000/api/v1/deletetodo/${id}`);
    fetch();
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Todo List Manager</h1>

        {/* Input Section */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            onChange={hchange}
            value={input.item}
            name="item"
            type="text"
            placeholder="Enter todo"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={hchange}
            value={input.des}
            name="des"
            type="text"
            placeholder="Enter description"
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={hclick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>

        {/* Scrollable Cards Section */}
        <div className="w-full h-80 overflow-y-scroll border rounded-md p-4 bg-gray-50 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((t) => (
              <div
                key={t._id}
                className="bg-gray-100 border rounded-md shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{t.item}</h2>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => update(t._id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => delet(t._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
