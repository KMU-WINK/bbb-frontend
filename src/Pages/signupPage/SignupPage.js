import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const data = await response.json();
      alert(data.message); // 회원가입 성공 메시지 표시
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? '가입 중...' : '회원가입하기'}
        </button>
        <p className="signin-text">
          이미 계정이 있으신가요? <a href="/signin">로그인</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;