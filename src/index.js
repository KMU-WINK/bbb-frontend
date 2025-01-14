import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App 컴포넌트를 가져옵니다.
import "./index.css"; // 필요한 경우 스타일 파일

const root = ReactDOM.createRoot(document.getElementById("root")); // HTML의 root 요소를 찾습니다.
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
