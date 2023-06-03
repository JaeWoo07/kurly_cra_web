import React from 'react';
import NoticeBoard2ComponentChild from './NoticeBoard2ComponentChild.jsx';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

function NoticeBoard2Component(){

    const [state, setState] = React.useState({
        자주하는질문: []
    });

    React.useEffect(()=>{
        axios({
            url: './data/notice2.json',
            method: 'GET'
        })
        .then((res)=>{
            // console.log('AXIOS 성공', res.data);
            if(res.status === 200){
                setState({
                    ...state,
                    자주하는질문: res.data.자주하는질문
                });
            }
        })
        .catch((err)=>{
            // console.log('AXIOS 실패', err);
        });
    }, []);

    return (
        <main id="board" className="notice2">

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
                        <h3><strong>자주하는 질문</strong><em>고객님들께서 가장 자주하시는 질문을 모두 모았습니다.</em></h3>
                        <div>
                            <h4>번호</h4>
                            <h4>카테고리</h4>
                            <h4>제목</h4>
                        </div>
                        {/* <ul>
                            <li>
                                <span>169</span>
                                <span>취소/교환/환불</span>
                                <span>교환(반품) 진행 시, 배송비가 부과 되나요?</span>
                            </li>
                        </ul> */}
                        <NoticeBoard2ComponentChild 자주하는질문={state.자주하는질문}/>
                    </div>
                </div>
            </section>         
            
        </main>
    );
};

export default NoticeBoard2Component;