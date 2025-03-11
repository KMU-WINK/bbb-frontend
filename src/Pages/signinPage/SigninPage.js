import React, { useState, useCallback } from 'react';
import './SigninPage.css';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const REST_API_KEY = '05d5094ee72245305bb38c8f2de73ed3';  // 카카오 API 키
  const REDIRECT_URI = `http://${process.env.REACT_APP_API_URL}:3000/auth/kakao/callback`;  // 카카오 로그인 리디렉션 URI
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 이메일 로그인
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 토큰 저장
      if (response.ok && data.success) {
        localStorage.setItem('authToken', data.token); 
        navigate('/main');
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    }
  };

  // 카카오 로그인
  const loginHandle = () => {
    window.location.href = link;
  };

  // 카카오 로그인 리디렉션 URI에서 받은 code 처리
  const handleKakaoRedirect = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // 카카오 인증 코드 가져오기

    if (code) {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3000/auth/kakao`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          // 카카오 로그인 성공 시 토큰 저장
          localStorage.setItem('authToken', data.token); // 토큰 저장
          navigate('/main');
        } else {
          setError(data.message || '카카오 로그인 실패');
        }
      } catch (err) {
        setError('서버 오류가 발생했습니다.');
      }
    }
  }, [navigate]); // navigate를 의존성 배열에 추가

  // 페이지가 로드될 때 카카오 로그인 리디렉션 처리
  React.useEffect(() => {
    if (window.location.search.includes('code')) {
      handleKakaoRedirect();
    }
  }, [handleKakaoRedirect]); // handleKakaoRedirect를 의존성 배열에 추가

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignin}>
        <h1 className="signin-title">로그인</h1>
        <div className="form-group">
          <input
            type="email"
            placeholder="✉️ 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="🔒 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-button">
          이메일로 로그인
        </button>
        <h1 className="kakao-signin">간편 로그인</h1>
        <button type="button" className="signin-button-kakao" onClick={loginHandle}>
          🗨️ 카카오 로그인
        </button>
        {error && <p className="error-text">{error}</p>}
        <p className="signup-text">
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </p>
      </form>
    </div>
  );
};

export default SigninPage;
