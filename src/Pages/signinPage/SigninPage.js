import React from 'react';
import './SigninPage.css';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const navigate = useNavigate();
  const REST_API_KEY = '';
  const REDIRECT_URI = ''; 
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleSignin = (e) => {
    e.preventDefault();
    console.log('Email Signin submitted');
    navigate('/main'); // 로그인 성공 시 이동
  };

  const loginHandle = () => {
    window.location.href = link;
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignin}>
        <h1 className="signin-title">로그인</h1>
        <div className="form-group">
          <input type="email" id="email" name="email" placeholder="✉️ 이메일" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="🔒 비밀번호" required />
        </div>
        <button type="submit" className="signin-button">
          이메일로 로그인
        </button>
        <h1 className="kakao-signin">간편 로그인</h1>
        <button type="button" className="signin-button-kakao" onClick={loginHandle}>
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

