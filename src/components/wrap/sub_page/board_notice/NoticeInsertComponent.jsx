import React from 'react';
import NoticeLeftComponent from './NoticeLeftComponent';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function NoticeInsertComponent(){

    let navigate  = useNavigate();

    const [state, setState] = React.useState({
        제목: '',
        내용: '',
        // 작성자: '',
        아이디: '',
        isModal: false,
        modalMsg: ''
    });

    
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            제목: e.target.value
        });
    };


    const onChangeContents=(e)=>{
        setState({
            ...state,
            내용: e.target.value
        });
    };


    // 글쓰기 등록 전송
    const onSubmitInsertEvent=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';

        if(state.제목 === '' || state.내용 === ''){
            if(state.제목 === ''){
                modalMsg = '제목을 입력해 주세요.';
                isModal = true;
            }
            else if(state.내용 === ''){
                modalMsg = '내용을 입력해 주세요.';
                isModal = true;
            }
            else{
                modalMsg = '';
                isModal = false;
            }
        }
        else{
            let newFormData = new FormData();
            newFormData.append('user_id', state.아이디);
            newFormData.append('subject', state.제목);
            newFormData.append('contents', state.내용);
            // newFormData.append('user_name', state.작성자);
            
            axios({
                url: 'https://jaewoo07.com/cra_cors7/notice_insert.php',
                method: 'POST',
                data: newFormData
            })
            .then((res)=>{
                if(res.status === 200){
                    // console.log('AXIOS 성공');
                    // console.log(res.data);
                    if(res.data === 1){
                        modalMsg = '';
                        isModal = false;
                        window.location.pathname = '/공지사항';
                    }
                    else if(res.data === -1){
                        modalMsg = '다시 작성해 주세요.';
                        isModal = true;
                    }
                }

                setState({
                    ...state,
                    isModal: isModal,
                    modalMsg: modalMsg
                });
            })
            .catch((err)=>{
                // console.log('AXIOS 실패');
                // console.log(err);
            });
        }

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg
        });
    };


    // 모달 닫기 버튼 클릭 이벤트
    const onClickModalClose=(e)=>{
        e.preventDefault();
     
            setState({
                ...state,
                isModal: false,
                modalMsg: ''
            });       
    };



    return (
        <>
            <div id="board" className='noticeInsert'>
                <div className="container">
                    <NoticeLeftComponent/>
                    <div className="right">
                        <div className="title">
                            <h3><strong>공지사항</strong></h3>
                        </div>
                        <form onSubmit={onSubmitInsertEvent} name='insert_form' id='insertForm' method='post' action="notice_insert.php">
                            <ul>
                                <li>
                                    <div className="left">
                                        <label htmlFor='subject'>제목<i>*</i></label>
                                    </div>
                                    <div className="right">
                                        <input 
                                            type="text" 
                                            id='subject' 
                                            name='subject' 
                                            placeholder='제목을 입력해 주세요.'
                                            onChange={onChangeSubject}
                                            value={state.제목}
                                            />
                                    </div>
                                </li>
                                <li>
                                    <div className="left">
                                        <label htmlFor='contents'>내용<i>*</i></label>
                                    </div>
                                    <div className="right">
                                        <textarea 
                                            type="text" 
                                            id='contents' 
                                            name='contents' 
                                            placeholder='글 내용을 입력해 주세요.'
                                            onChange={onChangeContents}
                                            value={state.내용}
                                            ></textarea>
                                    </div>
                                </li>
                            </ul>
                            <div className="button-box">
                                <button type='submit'>등록</button>
                                <button type='button' onClick={()=>{navigate(-1)}}>취소</button>
                            </div>
                        </form>                                     
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