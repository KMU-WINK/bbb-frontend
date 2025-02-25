import React from "react";
import "./SigninPage.css";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    console.log("Signin submitted");
    navigate("/main");
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignin}>
        <h1 className="signin-title">로그인</h1>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="✉️ 이메일"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="🔒 비밀번호"
            required
          />
        </div>
        <button type="submit" className="signin-button">
          이메일로 로그인
        </button>
        <h1 className="kakao-signin">간편 로그인</h1>
        <button type="submit" className="signin-button-kakao">
          🗨️ 카카오 로그인
        </button>
        <p className="signup-text">
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </p>
      </form>
    </div>
  );
};

export default SigninPage;
//카카오사진수정
