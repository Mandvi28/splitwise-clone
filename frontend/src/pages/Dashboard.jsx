import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <button
  onClick={() => {
    localStorage.removeItem("token");
    navigate("/");
  }}
  className="bg-red-500 px-3 py-1 rounded text-white"
>
  Logout
</button>
      <div className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">
          Splitwise Clone Dashboard 🚀
        </h1>
      </div>

      {/* Page Content Wrapper */}
      <div className="max-w-6xl mx-auto p-6">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Welcome Back 👋
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Groups */}
          <div
            onClick={() => navigate("/groups")}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-bold mb-2">Groups</h3>
            <p className="text-gray-600">Manage your groups</p>
          </div>

          {/* Expenses */}
          <div
            onClick={() => navigate("/expenses")}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-bold mb-2">Expenses</h3>
            <p className="text-gray-600">Track shared expenses</p>
          </div>

          {/* Balances */}
          <div
            onClick={() => navigate("/balances")}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-bold mb-2">Balances</h3>
            <p className="text-gray-600">See who owes what</p>
          </div>

        </div>

      </div>
    </div>
  );
}