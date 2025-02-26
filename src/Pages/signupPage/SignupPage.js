import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">회원가입</h1>
        <div className="form-group">
          <label htmlFor="name">👤 닉네임</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="사용하실 닉네임을 입력해 주세요."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">✉ 이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">🔒 비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          회원가입하기
        </button>
        <p className="signin-text">
          이미 계정이 있으신가요? <a href="/signin">로그인</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
