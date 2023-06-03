import React from 'react';
import { /* useLocation, */ useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function NoticeViewComponent({login}){


    // const queryData = useLocation();


    const [param, setParam] = useSearchParams();
    const listNum = param.get('listNum');
    

    const [state, setState] = React.useState({
        isModal: false,
        modalMsg: '',
        공지사항: {}
    });


    const onClickList=(e)=>{
        e.preventDefault();

        window.location.pathname = '/공지사항';
    }



    React.useEffect(()=>{

        let noticeViewFormData = new FormData();
        noticeViewFormData.append('idx', listNum);

        axios({
            url: 'https://jaewoo07.com/cra_cors7/notice_select_view.php',
            method: 'POST',
            data: noticeViewFormData
        })
        .then((res)=>{
            // console.log('axios 성공');
            // console.log(res);
            // console.log(res.data);

            if(res.status === 200){
                setState({
                    ...state,
                    공지사항: res.data[0]
                });
            }
        })
        .catch((err)=>{
            // console.log('axios 실패', err);
        });

    }, [listNum]);


    // 삭제
    const onClickDelete=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';

        let noticeViewFormData = new FormData();
        noticeViewFormData.append('idx', listNum);

        axios({
            url: 'https://jaewoo07.com/cra_cors7/notice_delete.php',
            method: 'POST',
            data: noticeViewFormData
        })
        .then((res)=>{
            // console.log('axios 성공');
            // console.log(res);
            // console.log(res.data);

            if(res.status === 200){
                if(res.data === 1){
                    isModal = true;
                    modalMsg = '글이 삭제되었습니다.';                 
                }
                else if(res.data === -1){
                    isModal = false;
                    modalMsg = '';
                }
            }

            setState({
                ...state,
                isModal: isModal,
                modalMsg: modalMsg
            });
        })
        .catch((err)=>{
            // console.log('axios 실패', err);
        });

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg
        });
    }


    // 모달 닫기 버튼 클릭 이벤트
    const onClickModalClose=(e)=>{
        e.preventDefault();
        
        if(state.modalMsg.includes('글이 삭제되었습니다.') === true){
            window.location.href = '/공지사항';
        }
   
        setState({
            ...state,
            isModal: false,
            modalMsg: ''
        });       
    };



    return (
        <>      
            <div id="board" className='NoticeView'>
                <div className="container">
                    <div className="title">
                        <h2>공지사항</h2>
                        <h5>컬리의 새로운 소식들과 유용한 정보들을 한 곳에서 확인하세요.</h5>
                    </div>
                    <div className="content">
                        <ul>
                            <li>
                                <div className="left">
                                    <ul>
                                        <li>제목</li>
                                        <li>작성자</li>
                                        <li>작성일</li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <ul>
                                        <li>{state.공지사항.제목}</li>
                                        <li>{state.공지사항.작성자}</li>
                                        <li>{`${new Date(state.공지사항.작성일).getFullYear()}.${(new Date(state.공지사항.작성일).getMonth() + 1) < 10 ? "0" + (new Date(state.공지사항.작성일).getMonth() + 1) : (new Date(state.공지사항.작성일).getMonth() + 1)}.${(new Date(state.공지사항.작성일).getDate()) < 10 ? "0" + (new Date(state.공지사항.작성일).getDate()) : (new Date(state.공지사항.작성일).getDate())}`}</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div className='notice-content'>
                                    {state.공지사항.내용}
                                </div>
                            </li>
                            <li>
                                <div className="button-box">
                                    <Link to={"/공지사항수정?listNum=" + listNum} className={`${login.name === "" ? "on" : ""}`}>수정</Link>
                                    <button type='button' onClick={onClickDelete} className={`${login.name === "" ? "on" : ""}`}>삭제</button>
                                    <button type='button' onClick={onClickList}>목록</button>
                                </div> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 모달창 */}
            {
                state.isModal &&
                (
                    <div id="modal">
                        <div className="wrap">
                            <div className="container">
                                <div className="message-box">
                                    <h2 className="message">{state.modalMsg}</h2>
                                </div>
                                <div className="button-box">
                                    <button 
                                        className="modal-close-btn"
                                        onClick={onClickModalClose}
                                        >확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};