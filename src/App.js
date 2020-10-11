import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleItems = (e) => {
    e.preventDefault();
    if (input.length === 0) return;

    const newItem = {
      text: input,
      selected: false,
    };
    setItems([...items, newItem]);
    setInput("");
  };

  const handleRadomize = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomItem, 100 * i);
    }
  };

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const updatedItems = items.map((_item) =>
      _item === randomItem
        ? { ..._item, selected: true }
        : { ..._item, selected: false }
    );
    setItems(updatedItems);
  };

  return (
    <div className="container mx-auto shadow-lg w-1/2 p-6 bg-white rounded-md">
      <form className="flex " onSubmit={handleItems}>
        <input
          className="rounded focus:outline-none py-2 px-4 border border-indigo-600 flex-1 mr-2"
          type="text"
          placeholder="Add a new item..."
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className="border border-green-600 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold focus:outline-none"
        >
          Add
        </button>
      </form>

      <ul>
        {items.map((_item, _index) => (
          <li
            className={`font-semibold my-4 p-1 rounded ${_item.selected ? "bg-orange-600 text-white" : ""}`}
            key={_index}
          >
            {_item.text}
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button
          className="border border-indigo-600 bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold focus:outline-none"
          onClick={handleRadomize}
        >
          Randomize
        </button>
      )}
    </div>
  );
}

export default App;

// random picker TODO:
// box - container
// add button
// list of items
// randomize button
