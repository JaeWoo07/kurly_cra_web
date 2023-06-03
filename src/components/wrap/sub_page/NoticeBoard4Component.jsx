import React from 'react';
import {NavLink} from 'react-router-dom';
// import NoticeBoardComponentChild from './NoticeBoardComponentChild.jsx';
// import axios from 'axios';


function NoticeBoard4Component(){

    return (
        <main id="board" className="notice4">

            <section id="section1">
                <div className="container">
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
                    <div className="right">
                        <h1 style={{fontSize: '50px', textAlign:'center', padding: '250px', background:'#f6f6f6'}}>대량주문 문의</h1>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

export default NoticeBoard4Component;