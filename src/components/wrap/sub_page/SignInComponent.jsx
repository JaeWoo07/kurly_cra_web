import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function SignInComponent({signInName}){

    const [state, setState] = React.useState({
        id: '',
        pw: '',

        isModal: false,
        modalMsg: ''
    });


    const onClickSignInSubmit=(e)=>{
        e.preventDefault();
        let modalMsg = '';
        let isModal = false;
        let id = '';
        let pw = '';

        if(state.id === '' || state.pw === ''){
            isModal = true;
            modalMsg = '아이디 또는 비밀번호를 입력해 주세요.';           
        }
        else{  // AXIOS
            const formData = new FormData();
            formData.append('user_id', state.id);
            formData.append('user_pw', state.pw);

            axios({
                url: 'https://jaewoo07.com/cra_cors7/sign_in_session_cookie.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status === 200 && res.data.includes('데이터가 없습니다') === false){
                    // console.log('AXIOS 성공', res.data[0]);
                    // console.log(res.data);
                    // console.log('AXIOS 성공', res.data[0].세션아이디);

                    // 키 key
                    const key = `JW_${res.data[0].아이디}`;

                    signInName(res.data[0].이름); // 로그인 이름 유지
                    
                    let 아이디 = res.data[0].아이디;
                    let 세션아이디 = res.data[0].세션아이디;

                    // 세션 스토리지
                    // sessionStorage.setItem(아이디, 세션아이디);

                    //로컬 스토리지
                    const loginObj = {
                        id: 아이디,
                        sessionId: 세션아이디,
                        name: res.data[0].이름
                    }
                    localStorage.setItem(key, JSON.stringify(loginObj));

                    // 쿠키 설정 (3일간 유지)
                    let newDate = new Date();
                    newDate.setDate(newDate.getDate() + 3);
                    document.cookie = `${key} = ${세션아이디}; path = /; expires = ${newDate.toUTCString()};`;

                    window.location.reload();
                    
                    window.location.href = '/메인';

                    // 초기화
                    setState({
                        ...state,
                        id: '',
                        pw: '',
                        isModal: false,
                        modalMsg: ''
                    });
                }
                else{
                    isModal = true;
                    modalMsg = '아이디, 비밀번호를 확인해 주세요.';
                }
                
                setState({
                    ...state,
                    id: state.id,
                    pw: pw,
                    isModal: isModal,
                    modalMsg: modalMsg
                });

            })
            .catch((err)=>{
                console.log('AXIOS 실패', err);
            });
        }

        setState({
            ...state,
            id: state.id,
            pw: pw,
            isModal: isModal,
            modalMsg: modalMsg
        });
    }



    const onChangeId=(e)=>{
        setState({
            ...state,
            id: e.target.value
        });
    }



    const onChangePw=(e)=>{
        setState({
            ...state,
            pw: e.target.value
        });
   }


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
            <main id="sub" className="sign-in">

                <section id="signIn">
                    <div className="container">
                        <div className="gap">
                            <div className="title">
                                <h2>로그인</h2>
                            </div>
                            <div className="content">
                                <ul>
                                    <li>
                                        <input 
                                            type="text" 
                                            name='user_id' 
                                            placeholder='아이디를 입력해 주세요.'
                                            // autoFocus={true}
                                            // required={true}
                                            onChange={onChangeId}
                                            value={state.id}
                                            />
                                    </li>
                                    <li>
                                        <input 
                                            type="password" 
                                            name='user_id' 
                                            placeholder='비밀번호를 입력해 주세요.'
                                            // autoFocus={true}
                                            // required={true}
                                            onChange={onChangePw}
                                            value={state.pw}
                                            />
                                    </li>
                                    <li>
                                        <span>
                                            <Link to="/아이디찾기" title='아이디찾기'>아이디 찾기</Link>
                                            <i>|</i>
                                            <Link to="/비밀번호찾기" title='비밀번호찾기'>비밀번호 찾기</Link>
                                        </span>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={onClickSignInSubmit} 
                                            type='submit'>로그인</button>
                                    </li>
                                    <li>
                                        <Link to="/회원가입" title='회원가입'>회원가입</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                
            </main>

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

export default SignInComponent;