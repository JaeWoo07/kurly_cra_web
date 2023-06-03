import React, {useState, useEffect} from 'react';
import NoticeLeftComponent from './NoticeLeftComponent';
import NoticeRightComponent from './NoticeRightComponent';
import axios from 'axios';

export default function NoticeSelectComponent({login}){
  
    const [state, setState] = useState({
        공지사항: []
    });


    // 로딩 시 공지사항 목록 가져오기
    useEffect(()=>{
        axios({
            url: 'https://jaewoo07.com/cra_cors7/notice_select.php',
            method: 'POST'
        })
        .then((res)=>{
            if(res.status === 200){
                // console.log('AXIOS 성공');
                // console.log(res.data);
                setState({
                    ...state,
                    공지사항: res.data
                });
            }
        })
        .catch((err)=>{
            // console.log('AXIOS 실패');
            // console.log(err);
        });
    }, []);


    const onClickNoticeWrite=(e)=>{
        e.preventDefault();
        window.location.pathname = '/공지사항입력';
    }

    return (
        <div id="board" className='NoticeSelect'>
            <div className="container">
                <NoticeLeftComponent/>              
                <NoticeRightComponent 공지사항={state.공지사항}/>

                {/* 로그인 상태이면 하단에 글쓰기 버튼이 보인다. */}
                {/* 로그인 상태가 아니면 하단에 글쓰기 버튼을 숨긴다. */}
                <div className={`notice-write-btn-box${login.name === "" ? ' hide' : ''}`}>
                    <button onClick={onClickNoticeWrite} type='button'>글쓰기</button>
                </div>                                       
            </div>
        </div>
    );
};