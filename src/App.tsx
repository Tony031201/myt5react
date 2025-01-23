import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import TestSignOut from './pages/testSignOut.tsx';
import WhoamiTest from './pages/Whoami.tsx';
import Signin from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ProtectedRoute from './filters/ProtectdRoute.tsx';
import { Ask } from './api/userApi.ts';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>

    //   <Router>
    //   <Routes>
    //     <Route path="/" element={<h1>Home</h1>} />
    //     <Route path="/signup" element={<TestSignUp />} />
    //   </Routes>
    // </Router>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<h1>who</h1>} />
    //     <Route path="/whoami" element={<WhoamiTest />} />
    //   </Routes>
    // </Router>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<h1>signin</h1>} />
    //     <Route path="/signin" element={<TestSignin />} />
    //   </Routes>
    // </Router>

//     </div>
//   );
// }

const App: React.FC = () => {
  
  const [messages, setMessages] = useState([
    { content: `Hello! How can I help you? ${process.env.REACT_APP_baseURL}`, sender: "AI" },
  ]);

  const handleSend = async(content: string) => {
    if (!content.trim()) return;

    // 添加用户消息
    setMessages((prev) => [...prev, { content, sender: "User" }]);

    // AI 回复
    try{
      const response = await Ask(content);
      // 添加 AI 回复
      setMessages((prev) => [
        ...prev,
        { content: response, sender: "AI" }, // 假设 response 是 AI 的回复
      ]);
    }catch (error) {
      console.error("Error during API call:", error);
      // 显示错误消息（可选）
      setMessages((prev) => [
        ...prev,
        { content: "Sorry, something went wrong. Please try again.", sender: "AI" },
      ]);
    }
  };

  return (
    <Router>
      <Routes>
        {/* 聊天界面 */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
            <MainContainer style={{ height: "100vh" }}>
              <ChatContainer>
                <MessageList>
                  {messages.map((msg, index) => (
                    <Message
                      key={index}
                      model={{
                        message: msg.content,
                        sentTime: "just now",
                        sender: msg.sender,
                        direction:
                          msg.sender === "User" ? "outgoing" : "incoming",
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageList>
                <MessageInput
                  placeholder="Type your message..."
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
            </ProtectedRoute>
          }
        />
        {/* 注册 */}
        <Route path="/testsignout" element={<TestSignOut />} />
        {/* 查询当前用户 */}
        <Route path="/whoami" element={<WhoamiTest />} />
        {/* 登录 */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
