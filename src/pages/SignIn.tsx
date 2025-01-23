import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signin } from '../api/userApi.ts';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async() => {
    if (!username.trim()) {
      setError("Username cannot be empty!");
      return;
    }

    try {
      // 调用 userApi 中的 SignIn 函数
      const response = await Signin(username);
  
      // 根据后端返回的状态处理逻辑
      if (response && response.id) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Sign-in successful!");
        navigate("/chat");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An error occurred. Please try again later.");
    }

  };

  const redirectToSignUp = async()=>{
    try{
      navigate("/signup");
    }catch(err){
      console.error("Error during redirecting to sign-up:", error);
      setError("An error occurred. Please try again later.");
    }

  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>Sign In</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
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
        SignIn
      </button>
      <div style={{ height: "20px" }}></div> {/* 间隔 20px */}
      <button
        onClick={redirectToSignUp}
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

export default SignIn;