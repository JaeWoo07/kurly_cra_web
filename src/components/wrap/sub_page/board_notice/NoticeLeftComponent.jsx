import React from 'react';
import {NavLink} from 'react-router-dom';

function NoticeLeftComponent(){

    return (
        <div className="left">
            <h2>고객센터</h2>
            <ul>
                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/공지사항">공지사항</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/자주하는질문">자주하는 질문</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/1대1문의">1:1 문의</NavLink></li>
                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/대량주문문의">대량주문 문의</NavLink></li>
            </ul>
            <div>
                <p><a href="!#" onClick={e => e.preventDefault()}>도움이 필요하신가요?</a></p>
                <p><a href="!#" onClick={e => e.preventDefault()}>1:1 문의하기</a></p>
            </div>
        </div>
    );
};

export default NoticeLeftComponent;