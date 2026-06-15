import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("accounts/register/", {
        username,
        password,
      });

      alert("Registered Successfully ✅");
      navigate("/");

    } catch (err) {
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        placeholder="Username"
        className="border p-2 mb-2 w-64"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-64"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 w-64"
      >
        Register
      </button>

    </div>
  );
}