import React from 'react';
import axios from 'axios';

function SignInPwSearchComponent({timerCounterFn, timer}){

    // 타이머 프롭스 비구조화
    const {seconds, minutes, setId, timerMsg, timerEnd} = timer;


    const [state, setState] = React.useState({
        isPwSearchHp: true,
        isPwSearchEmail: false,
        isPwSearchHpInput: false,
        isPwSearchEmailInput: false,
        isId: false,
        isHp: false,
        isEmail: false,
        idMsg: '',
        hpMsg: '',
        emailMsg: '',
        아이디: '',
        휴대폰: '',
        이메일: '',

        isModal: false,
        modalMsg: '',

        isPwSearchHpBtn: true,     
        isPwSearchHpInputOk: false,
        isHpOk: false,
        hpOkMsg: '',
        휴대폰인증번호발송: '',
        휴대폰인증번호입력: '',

        isPwSearchEmailBtn : true,
        isPwSearchEmailInputOk: false,
        isEmailOk: false,
        emailOkMsg: '',
        이메일인증번호발송: '',
        이메일인증번호입력: '',
    });


    // 아이디
    const onChangeId=(e)=>{
        let isPwSearchHpInput = false;
        let isPwSearchEmailInput = false;
        let isId = false;
        let idMsg = '';
        const regExp1 = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

        if(e.target.value !== ""){

            e.target.value = e.target.value.replace(regExp1, "");

            if(e.target.value.length >= 1 && state.휴대폰.length >= 10 && state.isHp === false){
                isPwSearchHpInput = true;
                isPwSearchEmailInput = false;
                isId = false;
                idMsg = '';
            }
            else if(e.target.value.length >= 1 && state.이메일.length >= 1 && state.isEmail === false){
                isPwSearchEmailInput = true;
                isPwSearchHpInput = false;
                isId = false;
                idMsg = '';
            }

            else{
                isPwSearchHpInput = false;
                isPwSearchEmailInput = false;
                isId = false;
                idMsg = '';
            }
        }
        else{
            isId = true;
            idMsg = '가입 시 등록한 아이디를 입력해 주세요.';
        }

        setState({
            ...state,
            isPwSearchHpInput: isPwSearchHpInput,
            isPwSearchEmailInput: isPwSearchEmailInput,
            아이디: e.target.value,
            isId: isId,
            idMsg: idMsg
        });
    }


    // 휴대폰
    const onChangeHp=(e)=>{
        let isPwSearchHpInput = false;
        let isHp = false;
        let hpMsg = '';
        const regExp1 = /[^0-9]/g;
        const regExp2 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;

        if(e.target.value !== ""){

            e.target.value = e.target.value.replace(regExp1, "");

            if(regExp2.test(e.target.value) === false){
                isHp = true;
                hpMsg = '휴대폰 번호를 정확히 입력해 주세요.';
            }
            else{
                if(e.target.value.length >= 10 && state.아이디.length >= 1){
                    isPwSearchHpInput = true;
                    isHp = false;
                    hpMsg = '';
                }
                else{
                    isPwSearchHpInput = false;
                    isHp = false;
                    hpMsg = '';
                }
            }
        }
        else{
            isHp = true;
            hpMsg = '가입 시 등록한 휴대폰 번호를 입력해 주세요.';
        }

        setState({
            ...state,
            휴대폰: e.target.value,
            isHp: isHp,
            hpMsg: hpMsg,
            isPwSearchHpInput: isPwSearchHpInput
        });

    };


    // 이메일
    const onChangeEmail=(e)=>{
        let isPwSearchEmailInput = false; 
        let isEmail = false;
        let emailMsg = '';
        const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}'/~?]+([-_.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([-_.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g;

        if(e.target.value !== ""){
            if(regExp1.test(e.target.value) === false){
                isEmail = true;
                emailMsg = '올바른 이메일 형식을 입력해 주세요.';
            }
            else{
                if(e.target.value.length >= 1 && state.아이디.length >= 1){
                    isPwSearchEmailInput = true;
                    isEmail = false;
                    emailMsg = '';
                }
                else{
                    isPwSearchEmailInput = false;
                    isEmail = false;
                    emailMsg = '';
                }
            }
        }
        else{
            isEmail = true;
            emailMsg = '가입 시 등록한 이메일을 입력해 주세요.';
        }

        setState({
            ...state,
            isEmail: isEmail,
            emailMsg: emailMsg,
            이메일: e.target.value,
            isPwSearchEmailInput: isPwSearchEmailInput
        });

    };



    const onClickTabHpBtn=(e)=>{
        e.preventDefault();
        clearInterval(setId);

        setState({
            ...state,
            isPwSearchHp: true,
            isPwSearchEmail: false,
            isPwSearchHpInput: false,
            isPwSearchEmailInput: false,
            isId: false,
            isHp: false,
            isEmail: false,
            idMsg: '',
            hpMsg: '',
            emailMsg: '',
            아이디: '',
            휴대폰: '',
            이메일: '',

            isPwSearchHpBtn: true,
            휴대폰인증번호입력: '',
            휴대폰인증번호발송: '',

            isPwSearchEmailBtn: true,
            이메일인증번호입력: '',
            이메일인증번호발송: ''
        });
    }


    const onClickTabEmailBtn=(e)=>{
        e.preventDefault();
        clearInterval(setId);

        setState({
            ...state,
            isPwSearchHp: false,
            isPwSearchEmail: true,
            isPwSearchHpInput: false,
            isPwSearchEmailInput: false,
            isId: false,
            isHp: false,
            isEmail: false,
            idMsg: '',
            hpMsg: '',
            emailMsg: '',
            아이디: '',
            휴대폰: '',
            이메일: '',

            isPwSearchHpBtn: true,
            휴대폰인증번호입력: '',
            휴대폰인증번호발송: '',

            isPwSearchEmailBtn: true,
            이메일인증번호입력: '',
            이메일인증번호발송: ''
        });
    }

    

    let FormData3 = new FormData();
    FormData3.append("user_id", state.아이디);
    FormData3.append("user_hp", state.휴대폰);

    // 비밀번호 찾기 버튼: 휴대폰
    const onClickPwHpSearch=(e)=>{
        e.preventDefault();
        let isPwSearchHpBtn = true;
        let isModal = false;
        let modalMsg = '';
        let num = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_pw_select_hp.php",
            method: "POST",
            data: FormData3
        })
        .then((res)=>{
            // console.log("AXIOS 성공" + res.data);
            // console.log(res.data);

            if(res.data.includes('데이터가 없습니다') !== true){
                isPwSearchHpBtn = false;
                isModal = true;

                // 인증번호 7자리(랜덤) Math.random()
                num = Math.floor(Math.random() * 9000000 + 1000000);
                isModal = true;
                modalMsg = `인증번호가 발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

                timerCounterFn();
            }
            else{
                isPwSearchHpBtn = true;
                isModal = true;
                modalMsg = '가입 시 입력하신 회원 정보가 맞는지 다시 한 번 확인해 주세요.';
            }

            setState({
                ...state,
                isPwSearchHpBtn: isPwSearchHpBtn,
                isModal: isModal,
                modalMsg: modalMsg,
                휴대폰인증번호발송: num
            });
        })
        .catch((err)=>{
            // console.log("AXIOS 실패" + err);
        });

        setState({
            ...state,
            isPwSearchHpBtn: isPwSearchHpBtn,
            isModal: isModal,
            modalMsg: modalMsg,
            휴대폰인증번호발송: num
        });
    };


    // 휴대폰 인증번호 입력상자 이벤트
    const onChangeHpReBtnInput=(e)=>{
        const regExp1 = /[^0-9]/g;
        let isPwSearchHpInputOk = false;
        let isHpOk = false;
        let hpOkMsg = '';

        e.target.value = e.target.value.replace(regExp1, "");


        if(e.target.value !== ""){
            if(e.target.value.length === 7){
                isPwSearchHpInputOk = true;
                isHpOk = false;
                hpOkMsg = '';
            }
            else{
                isPwSearchHpInputOk = false;
                isHpOk = true;
                hpOkMsg = '7자리를 입력해 주세요.';
            }
        }
        else{
            isHpOk = true;
            hpOkMsg = '인증번호를 입력해 주세요.';
        }
  
        setState({
            ...state,
            휴대폰인증번호입력: e.target.value,
            isPwSearchHpInputOk: isPwSearchHpInputOk,
            isHpOk: isHpOk,
            hpOkMsg: hpOkMsg
        });
    };



    // 휴대폰인증번호발송과 휴대폰인증번호입력 비교하기
    const onClickPwOk=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_pw_select_hp.php",
            method: "POST",
            data: FormData3
        })
        .then((res)=>{         
            if(res.data.includes('데이터가 없습니다') !== true){
                if(state.휴대폰인증번호발송 === Number(state.휴대폰인증번호입력)){
                    // console.log("AXIOS 성공" + res.data);
                    // console.log(res.data);
                    isModal = false;
                    modalMsg = '';

                    // 타이머 정지
                    clearInterval(setId);

                    // 세션스토리지 아이디 저장
                    let key = 'KURLY_ID_SEARCH';
                    const data = {
                        아이디: res.data[0].아이디,
                        휴대폰: res.data[0].휴대폰
                    }
                    sessionStorage.setItem(key, JSON.stringify(data));
             
                    window.location.href = '/비밀번호찾기결과';
                }
                else{
                    isModal = true;
                    modalMsg = `인증번호가 일치하지 않습니다.\n\n가입 후 번호가 변경되었다면 이메일로 아이디 찾기를 시도해 보세요.`;
                }
            }
            setState({
                ...state,
                isModal: isModal,
                modalMsg: modalMsg
            });
        })
        .catch((err)=>{
            console.log("AXIOS 실패" + err);
        });

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg
        });
    };



    // 인증번호 재발송
    const onClickHpReBtn=(e)=>{
        e.preventDefault();

        let num = '';
        let isModal = false;
        let modalMsg = '';

        // 인증번호 7자리(랜덤) Math.random()
        num = Math.floor(Math.random() * 9000000 + 1000000);
        isModal = true;
        modalMsg = `인증번호가 재발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

        clearInterval(setId);

        timerCounterFn();

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg,
            휴대폰인증번호발송: num,
            휴대폰인증번호입력: ''
        });
    }



    let FormData4 = new FormData();
    FormData4.append("user_id", state.아이디);
    FormData4.append("user_email", state.이메일);

    // 비밀번호 찾기 버튼: 이메일
    const onClickPwEmailSearch=(e)=>{
        e.preventDefault();
        let isPwSearchEmailBtn = true;
        let isModal = false;
        let modalMsg = '';
        let num = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_pw_select_email.php",
            method: "POST",
            data: FormData4
        })
        .then((res)=>{
            // console.log("AXIOS 성공" + res.data);
            // console.log(res.data);

            if(res.data.includes('데이터가 없습니다') !== true){
                isPwSearchEmailBtn = false;
                isModal = true;

                // 인증번호 7자리(랜덤) Math.random()
                num = Math.floor(Math.random() * 9000000 + 1000000);
                isModal = true;
                modalMsg = `인증번호가 발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

                timerCounterFn();
            }
            else{
                isPwSearchEmailBtn = true;
                isModal = true;
                modalMsg = '가입 시 입력하신 회원 정보가 맞는지 다시 한 번 확인해 주세요.';
            }

            setState({
                ...state,
                isPwSearchEmailBtn: isPwSearchEmailBtn,
                isModal: isModal,
                modalMsg: modalMsg,
                이메일인증번호발송: num
            });
        })
        .catch((err)=>{
            // console.log("AXIOS 실패" + err);
        });

        setState({
            ...state,
            isPwSearchEmailBtn: isPwSearchEmailBtn,
            isModal: isModal,
            modalMsg: modalMsg,
            이메일인증번호발송: num
        });
    };



    // 이메일 인증번호 입력상자 이벤트
    const onChangeEmailReBtnInput=(e)=>{
        const regExp1 = /[^0-9]/g;
        let isPwSearchEmailInputOk = false;
        let isEmailOk = false;
        let emailOkMsg = '';

        e.target.value = e.target.value.replace(regExp1, "");


        if(e.target.value !== ""){
            if(e.target.value.length === 7){
                isPwSearchEmailInputOk = true;
                isEmailOk = false;
                emailOkMsg = '';
            }
            else{
                isPwSearchEmailInputOk = false;
                isEmailOk = true;
                emailOkMsg = '7자리를 입력해 주세요.';
            }
        }
        else{
            isEmailOk = true;
            emailOkMsg = '인증번호를 입력해 주세요.';
        }


        setState({
            ...state,
            이메일인증번호입력: e.target.value,
            isPwSearchEmailInputOk: isPwSearchEmailInputOk,
            isEmailOk: isEmailOk,
            emailOkMsg: emailOkMsg
        });
    };



    // 이메일인증번호발송과 이메일인증번호입력 비교하기
    const onClickPwEmailOk=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';


        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_pw_select_email.php",
            method: "POST",
            data: FormData4
        })
        .then((res)=>{
            if(res.data.includes('데이터가 없습니다') !== true){
                if(state.이메일인증번호발송 === Number(state.이메일인증번호입력)){
                    // console.log("AXIOS 성공" + res.data);
                    // console.log(res.data);
                    isModal = false;
                    modalMsg = '';

                    // 타이머 정지
                    clearInterval(setId);

                    // 세션스토리지 아이디 저장
                    let key = 'KURLY_ID_SEARCH';
                    const data = {
                        아이디: res.data[0].아이디,
                        휴대폰: res.data[0].휴대폰
                    }
                    sessionStorage.setItem(key, JSON.stringify(data));

                    window.location.href = '/비밀번호찾기결과';
                }
                else{
                    isModal = true;
                    modalMsg = `인증번호가 일치하지 않습니다.\n\n가입 후 이메일이 변경되었다면 휴대폰 번호로 아이디 찾기를 시도해 보세요.`;
                }             
            }
            setState({
                ...state,
                isModal: isModal,
                modalMsg: modalMsg
            });      
        })
        .catch((err)=>{
            console.log("AXIOS 실패" + err);
        });  

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg
        });
    };



    // 인증번호 재발송
    const onClickEmailReBtn=(e)=>{
        e.preventDefault();

        let num = '';
        let isModal = false;
        let modalMsg = '';

        // 인증번호 7자리(랜덤) Math.random()
        num = Math.floor(Math.random() * 9000000 + 1000000);
        isModal = true;
        modalMsg = `인증번호가 재발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

        clearInterval(setId);

        timerCounterFn();

        setState({
            ...state,
            isModal: isModal,
            modalMsg: modalMsg,
            이메일인증번호발송: num,
            이메일인증번호입력: ''
        });
    }

    


    React.useEffect(()=>{

        if(state.isPwSearchHpBtn === false || state.isPwSearchEmailBtn === false){
            if(timerEnd === true){  // 유효시간 3분이 경과하면
                setState({
                    ...state,
                    isModal: true,  // 모달 열기
                    modalMsg: timerMsg,  // 모달 메세지
                    휴대폰인증번호입력:'',
                    isPwSearchHpBtn: true,

                    이메일인증번호입력:'',
                    isPwSearchEmailBtn: true
                })
            }      
        }
        else{
            if(timerEnd === true){  // 유효시간 3분이 경과하면
                setState({
                    ...state,
                    isModal: false,  // 모달 열기
                    modalMsg: '',  // 모달 메세지
                    휴대폰인증번호입력:'',
                    isPwSearchHpBtn: true,

                    이메일인증번호입력:'',
                    isPwSearchEmailBtn: true
                })
            }
        }     
    }, [timerEnd]);




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
            <main id="sub" className="sign-in-id-pw-search">

                <section id="signInIdPwSearch">
                    <div className="container">
                        <div className="gap">
                            <div className="title">
                                <h2>비밀번호 찾기</h2>
                            </div>
                            <div className="content">
                                <div className="tab-menu-box">
                                    <button onClick={onClickTabHpBtn} className={state.isPwSearchHp ? ' on' : ''}>휴대폰 인증</button>
                                    <button onClick={onClickTabEmailBtn} className={state.isPwSearchEmail ? ' on' : ''}>이메일 인증</button>
                                </div>
                                <form name='id_search' id='idSearch' method='post' action="./sign_in_id_search.php">
                                    {
                                        state.isPwSearchHp && (
                                            <ul>
                                                <li>
                                                    <label htmlFor="">아이디</label>
                                                    <input 
                                                        type="text"
                                                        name='user_id' 
                                                        placeholder='아이디를 입력해 주세요.'
                                                        maxLength={20}
                                                        onChange={onChangeId}
                                                        value={state.아이디}
                                                        disabled={state.isPwSearchHpBtn ? false : true}
                                                        className={state.isPwSearchHpBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isId ? ' on' : ''}`}>{state.idMsg}</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="">휴대폰 번호</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_hp' 
                                                        placeholder='휴대폰 번호를 입력해 주세요.'
                                                        maxLength={11}
                                                        onChange={onChangeHp}
                                                        value={state.휴대폰}
                                                        disabled={state.isPwSearchHpBtn ? false : true}
                                                        className={state.isPwSearchHpBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isHp ? ' on' : ''}`}>{state.hpMsg}</p>
                                                </li>
                                                <li className={state.isPwSearchHpBtn ? 'hide' : ''}>
                                                    <label htmlFor="">인증번호</label>
                                                    <input 
                                                        className='hpReBtnInput'
                                                        type="text" 
                                                        name='user_hp' 
                                                        placeholder='인증번호 7자리'
                                                        maxLength={7}
                                                        value={state.휴대폰인증번호입력}
                                                        onChange={onChangeHpReBtnInput}
                                                        />
                                                    <span className="count-timer">
                                                        <em className="minute">{minutes < 10 ? "0" + minutes : minutes}</em>
                                                        <i>:</i>
                                                        <em className="second">{seconds < 10 ? "0" + seconds : seconds}</em>
                                                    </span>
                                                    <button className='hpReBtn' onClick={onClickHpReBtn}>재발송</button>
                                                    <p className={`isError${state.isHpOk ? ' on' : ''}`}>{state.hpOkMsg}</p>    
                                                </li>
                                                <li className={state.isPwSearchHpBtn ? '' : 'hide'}>
                                                    <button
                                                        onClick={onClickPwHpSearch}
                                                        type='submit'
                                                        className={state.isPwSearchHpInput ? 'on' : ''}
                                                        disabled={!state.isPwSearchHpInput}
                                                        >인증번호 받기</button>
                                                </li>
                                                <li className={state.isPwSearchHpBtn ? 'hide' : ''}>
                                                    <button 
                                                        onClick={onClickPwOk} 
                                                        type='submit' 
                                                        className={state.isPwSearchHpInputOk ? 'on' : ''} 
                                                        disabled={!state.isPwSearchHpInputOk}
                                                        >확인</button>
                                                </li>
                                            </ul>
                                        )
                                    }
                                    {
                                        state.isPwSearchEmail && (
                                            <ul>
                                                <li>
                                                    <label htmlFor="">아이디</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_id' 
                                                        placeholder='아이디를 입력해 주세요.'
                                                        maxLength={20}
                                                        onChange={onChangeId}
                                                        value={state.아이디}
                                                        disabled={state.isPwSearchEmailBtn ? false : true}
                                                        className={state.isPwSearchEmailBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isId ? ' on' : ''}`}>{state.idMsg}</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="">이메일</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_email' 
                                                        placeholder='이메일을 입력해 주세요.'
                                                        onChange={onChangeEmail}
                                                        value={state.이메일}
                                                        disabled={state.isPwSearchEmailBtn ? false : true}
                                                        className={state.isPwSearchEmailBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isEmail ? ' on' : ''}`}>{state.emailMsg}</p>
                                                </li>
                                                <li className={state.isPwSearchEmailBtn ? 'hide' : ''}>
                                                    <label htmlFor="">인증번호</label>
                                                    <input 
                                                        className='emailReBtnInput'
                                                        type="text" 
                                                        name='user_email' 
                                                        placeholder='인증번호 7자리'
                                                        maxLength={7}
                                                        value={state.이메일인증번호입력}
                                                        onChange={onChangeEmailReBtnInput}
                                                        />
                                                    <span className="count-timer">
                                                        <em className="minute">{minutes < 10 ? "0" + minutes : minutes}</em>
                                                        <i>:</i>
                                                        <em className="second">{seconds < 10 ? "0" + seconds : seconds}</em>
                                                    </span>
                                                    <button className='emailReBtn' onClick={onClickEmailReBtn}>재발송</button>
                                                    <p className={`isError${state.isEmailOk ? ' on' : ''}`}>{state.emailOkMsg}</p>    
                                                </li>
                                                <li className={state.isPwSearchEmailBtn ? '' : 'hide'}>
                                                    <button
                                                        onClick={onClickPwEmailSearch}
                                                        type='submit'
                                                        className={state.isPwSearchEmailInput ? 'on' : ''}
                                                        disabled={!state.isPwSearchEmailInput}
                                                        >확인</button>
                                                </li>
                                                <li className={state.isPwSearchEmailBtn ? 'hide' : ''}>
                                                    <button 
                                                        onClick={onClickPwEmailOk}
                                                        type='submit' 
                                                        className={state.isPwSearchEmailInputOk ? 'on' : ''} 
                                                        disabled={!state.isPwSearchEmailInputOk}
                                                        >확인</button>
                                                </li>
                                            </ul>
                                        )
                                    }                                                      
                                </form>                          
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

export default SignInPwSearchComponent;