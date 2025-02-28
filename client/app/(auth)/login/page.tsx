"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="h-4/5 w-2/6 border-2 border-[#121212] rounded-xl p-6 flex flex-col items-center">
        <div className="font-bold text-3xl mb-6">MeterMate</div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-transparent border-[#121212]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg  bg-transparent border-[#121212]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#121212] text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
