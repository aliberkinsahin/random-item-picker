import React, { useState } from "react";
import "./App.css";

const initialItems = JSON.parse(localStorage.getItem("items")) || [];

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(initialItems);

  const updateItems = (updatedItems) => {
    storeToStorage(updatedItems);
    setItems(updatedItems);
  };

  const storeToStorage = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

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

    const updatedItems = [...items, newItem];
    updateItems(updatedItems);
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
    updateItems(updatedItems);
  };

  const removeItem = (i) => {
    const updatedItems = items.filter((_, index) => index !== i);
    updateItems(updatedItems);
  };

  return (
    <div className="container mx-auto shadow-lg sm:w-1/2 w-full p-6 bg-white rounded-md">
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
            className={`cursor-pointer font-semibold my-2 p-1 rounded hover:bg-gray-400 ${
              _item.selected ? "bg-orange-600 text-white" : ""
            }`}
            key={_index}
            onDoubleClick={() => removeItem(_index)}
          >
            {_item.text}
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <>
          <div className="border-t-2 border-gray-300 border-solid"></div>
          <button
            className="border border-indigo-600 bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold focus:outline-none w-full mb-1 mt-2"
            onClick={handleRadomize}
          >
            Randomize
          </button>
          <small>* Double click to remove an item.</small>
        </>
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
