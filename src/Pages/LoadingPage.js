import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';




const LoadingPage = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setRedirect(true), 3000); // 3초 후에 리다이렉트 설정
        return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 해제
    }, []); 

    if (redirect) {
        return <Navigate to="/signin" />; // 로딩 후 /signin 페이지로 리다이렉트
    } 

    return (
        <div style={styles.loadingContainer}>
        <img src="/logo.png" alt="App Logo" style={{width: '210px', height: '150px'}} />
        </div>
    );
    };

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: '150px',
        height: '150px',
    },
};

export default LoadingPage;
