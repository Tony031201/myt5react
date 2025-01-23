import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "../api/userApi.ts";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async() => {
    if (!username.trim() || !answer.trim()) {
      setError("Username and Answer cannot be empty!");
      return;
    }

    try {
      // 调用 userApi 中的 SignUp 函数
      const response = await Signup(username,answer);
      
      // 根据后端返回的状态处理逻辑
      if (response && response.id) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Sign-up successful!");
        navigate("/chat");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An error occurred. Please try again later.");
    }

  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>SignUp</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <p>Question</p>
        <input
          type="text"
          placeholder="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        SignUp
      </button>
    </div>
  );
};

export default SignUp;