import { useState } from "react";

export default function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    alert(`Expense Added: ${title} - ₹${amount}`);
    setTitle("");
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <div className="bg-white p-4 rounded shadow w-96">

        <input
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={addExpense}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Add Expense
        </button>

      </div>
    </div>
  );
}