import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("accounts/login/", {
        username,
        password,
      });

      // SAVE TOKEN
      localStorage.setItem("token", res.data.access);

      alert("Login Successful ✅");
      navigate("/dashboard");

    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-2xl font-bold mb-4">Login</h1>

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
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 w-64"
      >
        Login
      </button>

    </div>
  );
}