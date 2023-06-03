import React from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';

function SignInIdSearchComponent({timerCounterFn, timer}){

    // 타이머 프롭스 비구조화
    const {seconds, minutes, setId, timerMsg, timerEnd} = timer;


    const [state, setState] = React.useState({
        isIdSearchHp: true,
        isIdSearchEmail: false,
        isIdSearchHpInput: false,
        isIdSearchEmailInput: false,
        isName: false,
        isHp: false,
        isEmail: false,
        nameMsg: '',
        hpMsg: '',
        emailMsg: '',
        이름: '',
        휴대폰: '',
        이메일: '',

        isModal: false,
        modalMsg: '',

        isIdSearchHpBtn: true,     
        isIdSearchHpInputOk: false,
        isHpOk: false,
        hpOkMsg: '',
        휴대폰인증번호발송: '',
        휴대폰인증번호입력: '',
        // 휴대폰인증확인: false,

        isIdSearchEmailBtn : true,
        isIdSearchEmailInputOk: false,
        isEmailOk: false,
        emailOkMsg: '',
        이메일인증번호발송: '',
        이메일인증번호입력: '',
        // 이메일인증확인: false
    });


    const onClickTabHpBtn=(e)=>{
        e.preventDefault();
        clearInterval(setId);

        setState({
            ...state,
            isIdSearchHp: true,
            isIdSearchEmail: false,
            isIdSearchHpInput: false,
            isIdSearchEmailInput: false,
            isName: false,
            isHp: false,
            isEmail: false,
            nameMsg: '',
            hpMsg: '',
            emailMsg: '',
            이름: '',
            휴대폰: '',
            이메일: '',

            isIdSearchHpBtn: true,
            휴대폰인증번호입력: '',
            휴대폰인증번호발송: '',

            isIdSearchEmailBtn: true,
            이메일인증번호입력: '',
            이메일인증번호발송: ''
        });
    };


    const onClickTabEmailBtn=(e)=>{
        e.preventDefault();
        clearInterval(setId);

        setState({
            ...state,
            isIdSearchHp: false,
            isIdSearchEmail: true,
            isIdSearchHpInput: false,
            isIdSearchEmailInput: false,
            isName: false,
            isHp: false,
            isEmail: false,
            nameMsg: '',
            hpMsg: '',
            emailMsg: '',
            이름: '',
            휴대폰: '',
            이메일: '',

            isIdSearchHpBtn: true,
            휴대폰인증번호입력: '',
            휴대폰인증번호발송: '',

            isIdSearchEmailBtn: true,
            이메일인증번호입력: '',
            이메일인증번호발송: ''
        });
    };


    const onChangeName=(e)=>{
        let isIdSearchHpInput = false;
        let isIdSearchEmailInput = false;
        let isName = false;
        let nameMsg = '';
        const regExp1 = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

        if(e.target.value !== ''){

            e.target.value = e.target.value.replace(regExp1, "");

            if(e.target.value.length >= 1 && state.휴대폰.length >= 10 && state.isHp === false){
                isIdSearchHpInput = true;
                isIdSearchEmailInput = false;
                isName = false;
                nameMsg = '';
            }
            else if(e.target.value.length >= 1 && state.이메일.length >= 1 && state.isEmail === false){
                isIdSearchEmailInput = true;
                isIdSearchHpInput = false;
                isName = false;
                nameMsg = '';
            }
           
            else{
                isIdSearchHpInput = false;
                isIdSearchEmailInput = false;
                isName = false;
                nameMsg = '';
            }
        }
        else{
            isName = true;
            nameMsg = '가입 시 등록한 이름을 입력해 주세요.';
        }
 
        setState({
            ...state,
            이름: e.target.value,
            isIdSearchHpInput: isIdSearchHpInput,
            isIdSearchEmailInput: isIdSearchEmailInput,
            isName: isName,
            nameMsg: nameMsg
        });
    };


    const onChangeHp=(e)=>{
        let isIdSearchHpInput = false;
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
                if(e.target.value.length >= 10 && state.이름.length >= 1){
                    isIdSearchHpInput = true;
                    isHp = false;
                    hpMsg = '';
                }
                else{
                    isIdSearchHpInput = false;
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
            isIdSearchHpInput: isIdSearchHpInput,
            isHp: isHp,
            hpMsg: hpMsg
        });
    };



    const onChangeEmail=(e)=>{
        let isIdSearchEmailInput = false;
        let isEmail = false;
        let emailMsg = '';
        const regExp1 = /^[A-Za-z0-9`!#$%^&*+=|{}'/~?]+([-_.]?[A-Za-z0-9`!#$%^&*+=|{}~'/?])*@[A-Za-z0-9~]+([-_.]?[A-Za-z0-9~])*\.[A-Za-z]{2,3}$/g; 

        if(e.target.value !== ""){

            if(regExp1.test(e.target.value) === false){
                isEmail = true;
                emailMsg = '올바른 이메일 형식을 입력해 주세요.';
            }
            else{
                if(e.target.value.length >= 1 && state.이름.length >= 1){
                    isIdSearchEmailInput = true;
                    isEmail = false;
                    emailMsg = '';
                }
                else{
                    isIdSearchEmailInput = false;
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
            이메일: e.target.value,
            isIdSearchEmailInput: isIdSearchEmailInput,
            isEmail: isEmail,
            emailMsg: emailMsg
        });
    };



    let FormData1 = new FormData();
    FormData1.append("user_name", state.이름);
    FormData1.append("user_hp", state.휴대폰);

    // 아이디 찾기 버튼: 휴대폰
    const onClickIdHpSearch=(e)=>{
        e.preventDefault();
        let isIdSearchHpBtn = true;
        let isModal = false;
        let modalMsg = '';
        let num = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_id_select_hp.php",
            method: "POST",
            data: FormData1
        })
        .then((res)=>{
            // console.log("AXIOS 성공" + res.data);
            // console.log(res.data);

            if(res.data.includes('데이터가 없습니다') !== true){
                isIdSearchHpBtn = false;
                isModal = true;

                // 인증번호 7자리(랜덤) Math.random()
                num = Math.floor(Math.random() * 9000000 + 1000000);
                isModal = true;
                modalMsg = `인증번호가 발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

                timerCounterFn();
            }
            else{
                isIdSearchHpBtn = true;
                isModal = true;
                modalMsg = '가입 시 입력하신 회원 정보가 맞는지 다시 한 번 확인해 주세요.';
            }

            setState({
                ...state,
                isIdSearchHpBtn: isIdSearchHpBtn,
                isModal: isModal,
                modalMsg: modalMsg,
                휴대폰인증번호발송: num
            });
        })
        .catch((err)=>{
            console.log("AXIOS 실패" + err);
        });

        setState({
            ...state,
            isIdSearchHpBtn: isIdSearchHpBtn,
            isModal: isModal,
            modalMsg: modalMsg,
            휴대폰인증번호발송: num
        });
    };



    // 휴대폰 인증번호 입력상자 이벤트
    const onChangeHpReBtnInput=(e)=>{
        const regExp1 = /[^0-9]/g;
        let isIdSearchHpInputOk = false;
        let isHpOk = false;
        let hpOkMsg = '';

        e.target.value = e.target.value.replace(regExp1, "");


        if(e.target.value !== ""){
            if(e.target.value.length === 7){
                isIdSearchHpInputOk = true;
                isHpOk = false;
                hpOkMsg = '';
            }
            else{
                isIdSearchHpInputOk = false;
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
            isIdSearchHpInputOk: isIdSearchHpInputOk,
            isHpOk: isHpOk,
            hpOkMsg: hpOkMsg
        });
    };



    // 휴대폰인증번호발송과 휴대폰인증번호입력 비교하기
    const onClickIdOk=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_id_select_hp.php",
            method: "POST",
            data: FormData1
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
                        가입일자: res.data[0].가입일자
                    }
                    sessionStorage.setItem(key, JSON.stringify(data));
             
                    window.location.href = '/아이디찾기결과';
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



    React.useEffect(()=>{

        if(state.isIdSearchHpBtn === false || state.isIdSearchEmailBtn === false){
            if(timerEnd === true){  // 유효시간 3분이 경과하면
                setState({
                    ...state,
                    isModal: true,  // 모달 열기
                    modalMsg: timerMsg,  // 모달 메세지
                    휴대폰인증번호입력:'',
                    isIdSearchHpBtn: true,

                    이메일인증번호입력:'',
                    isIdSearchEmailBtn: true
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
                    isIdSearchHpBtn: true,

                    이메일인증번호입력:'',
                    isIdSearchEmailBtn: true
                })
            }
        }     
    }, [timerEnd]);




    let FormData2 = new FormData();
    FormData2.append("user_name", state.이름);
    FormData2.append("user_email", state.이메일);

    // 아이디 찾기 버튼: 이메일
    const onClickIdEmailSearch=(e)=>{
        e.preventDefault();
        let isIdSearchEmailBtn = true;
        let isModal = false;
        let modalMsg = '';
        let num = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_id_select_email.php",
            method: "POST",
            data: FormData2
        })
        .then((res)=>{
            // console.log("AXIOS 성공" + res.data);
            // console.log(res.data);

            if(res.data.includes('데이터가 없습니다') !== true){
                isIdSearchEmailBtn = false;
                isModal = true;

                // 인증번호 7자리(랜덤) Math.random()
                num = Math.floor(Math.random() * 9000000 + 1000000);
                isModal = true;
                modalMsg = `인증번호가 발송되었습니다.\n3분 안에 인증번호를 입력해 주세요.\n\n인증번호: [${num}]`;

                timerCounterFn();
            }
            else{
                isIdSearchEmailBtn = true;
                isModal = true;
                modalMsg = '가입 시 입력하신 회원 정보가 맞는지 다시 한 번 확인해 주세요.';
            }

            setState({
                ...state,
                isIdSearchEmailBtn: isIdSearchEmailBtn,
                isModal: isModal,
                modalMsg: modalMsg,
                이메일인증번호발송: num
            });      
        })
        .catch((err)=>{
            console.log("AXIOS 실패" + err);
        });

        setState({
            ...state,
            isIdSearchEmailBtn: isIdSearchEmailBtn,
            isModal: isModal,
            modalMsg: modalMsg,
            이메일인증번호발송: num
        });
    };




    // 이메일 인증번호 입력상자 이벤트
    const onChangeEmailReBtnInput=(e)=>{
        const regExp1 = /[^0-9]/g;
        let isIdSearchEmailInputOk = false;
        let isEmailOk = false;
        let emailOkMsg = '';

        e.target.value = e.target.value.replace(regExp1, "");


        if(e.target.value !== ""){
            if(e.target.value.length === 7){
                isIdSearchEmailInputOk = true;
                isEmailOk = false;
                emailOkMsg = '';
            }
            else{
                isIdSearchEmailInputOk = false;
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
            isIdSearchEmailInputOk: isIdSearchEmailInputOk,
            isEmailOk: isEmailOk,
            emailOkMsg: emailOkMsg
        });
    };



    // 이메일인증번호발송과 이메일인증번호입력 비교하기
    const onClickIdEmailOk=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';


        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_id_select_email.php",
            method: "POST",
            data: FormData2
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
                        가입일자: res.data[0].가입일자
                    }
                    sessionStorage.setItem(key, JSON.stringify(data));

                    window.location.href = '/아이디찾기결과';
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
                                <h2>아이디 찾기</h2>
                            </div>
                            <div className="content">
                                <div className="tab-menu-box">
                                    <button onClick={onClickTabHpBtn} className={state.isIdSearchHp ? 'on' : ''}>휴대폰 인증</button>
                                    <button onClick={onClickTabEmailBtn} className={state.isIdSearchEmail ? 'on' : ''}>이메일 인증</button>
                                </div>
                                <form name='id_search' id='idSearch' method='post' action="./sign_in_id_search.php">
                                    {
                                        state.isIdSearchHp && (
                                            <ul>
                                                <li>
                                                    <label htmlFor="">이름</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_name' 
                                                        placeholder='이름을 입력해 주세요.'
                                                        onChange={onChangeName}
                                                        value={state.이름}
                                                        maxLength={20}
                                                        disabled={state.isIdSearchHpBtn ? false : true}
                                                        className={state.isIdSearchHpBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isName ? ' on' : ''}`}>{state.nameMsg}</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="">휴대폰 번호</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_hp' 
                                                        placeholder='휴대폰 번호를 입력해 주세요.'
                                                        onChange={onChangeHp}
                                                        value={state.휴대폰}
                                                        maxLength={11}
                                                        disabled={state.isIdSearchHpBtn ? false : true}
                                                        className={state.isIdSearchHpBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isHp ? ' on' : ''}`}>{state.hpMsg}</p> 
                                                </li>
                                                <li className={state.isIdSearchHpBtn ? 'hide' : ''}>
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
                                                <li className={state.isIdSearchHpBtn ? '' : 'hide'}>
                                                    <button 
                                                        onClick={onClickIdHpSearch} 
                                                        type='submit' 
                                                        className={state.isIdSearchHpInput ? 'on' : ''} 
                                                        disabled={!state.isIdSearchHpInput}
                                                        >인증번호 받기</button>
                                                </li>
                                                <li className={state.isIdSearchHpBtn ? 'hide' : ''}>
                                                    <button 
                                                        onClick={onClickIdOk} 
                                                        type='submit' 
                                                        className={state.isIdSearchHpInputOk ? 'on' : ''} 
                                                        disabled={!state.isIdSearchHpInputOk}
                                                        >확인</button>
                                                </li>                             
                                            </ul>
                                        )
                                    }
                                    {
                                        state.isIdSearchEmail && (
                                            <ul>
                                                <li>
                                                    <label htmlFor="">이름</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_name' 
                                                        placeholder='이름을 입력해 주세요.'
                                                        onChange={onChangeName}
                                                        value={state.이름}
                                                        maxLength={20}
                                                        disabled={state.isIdSearchEmailBtn ? false : true}
                                                        className={state.isIdSearchEmailBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isName ? ' on' : ''}`}>{state.nameMsg}</p>
                                                </li>
                                                <li>
                                                    <label htmlFor="">이메일</label>
                                                    <input 
                                                        type="text" 
                                                        name='user_email' 
                                                        placeholder='이메일을 입력해 주세요.'
                                                        onChange={onChangeEmail}
                                                        value={state.이메일}
                                                        disabled={state.isIdSearchEmailBtn ? false : true}
                                                        className={state.isIdSearchEmailBtn ? '' : 'on'}
                                                        />
                                                    <p className={`isError${state.isEmail ? ' on' : ''}`}>{state.emailMsg}</p>
                                                </li>
                                                <li className={state.isIdSearchEmailBtn ? 'hide' : ''}>
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
                                                <li className={state.isIdSearchEmailBtn ? '' : 'hide'}>
                                                    <button 
                                                        onClick={onClickIdEmailSearch} 
                                                        type='submit' 
                                                        className={state.isIdSearchEmailInput ? 'on' : ''} 
                                                        disabled={!state.isIdSearchEmailInput}
                                                        >확인</button>
                                                </li>
                                                <li className={state.isIdSearchEmailBtn ? 'hide' : ''}>
                                                    <button 
                                                        onClick={onClickIdEmailOk}
                                                        type='submit' 
                                                        className={state.isIdSearchEmailInputOk ? 'on' : ''} 
                                                        disabled={!state.isIdSearchEmailInputOk}
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

export default SignInIdSearchComponent;