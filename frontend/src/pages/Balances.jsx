export default function Balances() {
  const balances = [
    { name: "Rahul", amount: 500 },
    { name: "Anita", amount: -200 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-4">Balances</h1>

      <div className="bg-white p-4 rounded shadow">

        {balances.map((b, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{b.name}</span>
            <span className={b.amount >= 0 ? "text-green-600" : "text-red-600"}>
              ₹{b.amount}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}