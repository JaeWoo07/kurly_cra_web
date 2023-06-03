import React from 'react';
import axios from 'axios';

function SignInPwResultComponent(){

    const [state, setState] = React.useState({
        아이디: '',
        휴대폰: '',
        pw1: '',
        pw2: '',
        isPw1_1: false,
        isPw1_2: false,
        isPw1_3: false,
        pw1Msg1: '',
        pw1Msg2: '',
        pw1Msg3: '',
        isPwReset: false,
        isModal: false,
        modalMsg: '',
        isPw2: false,
        pw2Msg: ''
    });



    const onChangePw1=(e)=>{
        const regExp1 = /.{10,}/g;
        const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)|((?=.*[0-9])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)/g;
        const regExp3 = /\s/g;
        const regExp4 = /(.)\1\1/g;
        const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g;
        let isPw1_1 = false;
        let isPw1_2 = false;
        let isPw1_3 = false;
        let pw1Msg1 = '';
        let pw1Msg2 = '';
        let pw1Msg3 = '';
        let isPw2 = false;
        let pw2Msg = state.pw2Msg;
        let isPwReset = false;

        if(regExp1.test(e.target.value) === false){
            pw1Msg1 = 'X 10자 이상 입력';
            isPw1_1 = true;
        }
        else {
            pw1Msg1 = 'O 10자 이상 입력';
            isPw1_1 = false;
        }

        if(regExp2.test(e.target.value) === false || regExp3.test(e.target.value) === true || regExp5.test(e.target.value) === true){
            pw1Msg2 = 'X 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw1_2 = true;
        }
        else {
            pw1Msg2 = 'O 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw1_2 = false;
        }

        if(regExp4.test(e.target.value) === true){
            pw1Msg3 = 'X 동일한 숫자 3개 이상 연속 사용 불가';
            isPw1_3 = false;
        }
        else {
            pw1Msg3 = 'O 동일한 숫자 3개 이상 연속 사용 불가';
            isPw1_3 = true;
        }

        if(state.pw2 !== ''){
            if(e.target.value !== state.pw2){
                pw2Msg = 'X 동일한 비밀번호를 입력해 주세요.';
                isPw2 = false;
            }
            else{
                pw2Msg = 'O 동일한 비밀번호를 입력해 주세요.';
                isPw2 = true;
            }
        }

        if(isPw1_1 === false && isPw1_2 === false && isPw1_3 === true && isPw2 === true){
            isPwReset = true;
        }
        else{
            isPwReset = false;
        }        

        setState({
            ...state,
            pw1: e.target.value,
            isPw1_1: isPw1_1,
            isPw1_2: isPw1_2,
            isPw1_3: isPw1_3,
            pw1Msg1: pw1Msg1,
            pw1Msg2: pw1Msg2,
            pw1Msg3: pw1Msg3,
            isPw2: isPw2,
            pw2Msg: pw2Msg,
            isPwReset: isPwReset
        });
    }



    const onChangePw2=(e)=>{
        let isPw2 = false;
        let pw2Msg = '';
        let isPwReset = false;
        let isPw1_1 = state.isPw1_1;
        let isPw1_2 = state.isPw1_2;
        let isPw1_3 = state.isPw1_3;

        if(e.target.value === ''){
            pw2Msg = 'X 동일한 비밀번호를 입력해 주세요.';
            isPw2 = false;
        }
        else{
            if(e.target.value !== state.pw1){
                pw2Msg = 'X 동일한 비밀번호를 입력해 주세요.';
                isPw2 = false;
            }
            else {
                pw2Msg = 'O 동일한 비밀번호를 입력해 주세요.';
                isPw2 = true;
            }
        }

        if(isPw1_1 === false && isPw1_2 === false && isPw1_3 === true && isPw2 === true){
            isPwReset = true;
        }
        else{
            isPwReset = false;
        }

        setState({
            ...state,
            pw2: e.target.value,
            isPw2: isPw2,
            pw2Msg: pw2Msg,
            isPwReset: isPwReset,
            isPw1_1: isPw1_1,
            isPw1_2: isPw1_2,
            isPw1_3: isPw1_3
        });
    }



    React.useEffect(()=>{

        let key = 'KURLY_ID_SEARCH';

        if(sessionStorage.getItem(key) !== null){
            const result = JSON.parse(sessionStorage.getItem(key));
            setState({
                ...state,
                아이디: result.아이디,
                휴대폰: result.휴대폰
            });
        }

    }, [state.아이디, state.휴대폰]);




    let FormData5 = new FormData();
    FormData5.append("user_id", state.아이디);
    FormData5.append("user_pw", state.pw1);
    FormData5.append("user_hp", state.휴대폰);

    const onClickSubmit=(e)=>{
        e.preventDefault();
        let isModal = false;
        let modalMsg = '';

        axios({
            url: "https://jaewoo07.com/cra_cors7/cors_member_pw_update.php",
            method: "POST",
            data: FormData5
        })
        .then((res)=>{
            // console.log("AXIOS 성공" + res.data);
            // console.log(res.data);

            if(Number(res.data) === 1){
                isModal = true;
                modalMsg = '비밀번호 변경이 완료되었습니다.';         
            }
            else{
                isModal = false;
                modalMsg = '';
                console.log('비밀번호 다시 입력하세요')
            }

            setState({
                ...state,
                isModal: isModal,
                modalMsg: modalMsg
            });
        })
        .catch((err)=>{
            // console.log("AXIOS 실패" + err);
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

        if(state.modalMsg.includes('비밀번호 변경이 완료되었습니다.') === true){
            window.location.href = '/로그인';
        }
     
        setState({
            ...state,
            isModal: false,
            modalMsg: ''
        });       
    };



    return (
        <>
            <main id="sub" className="sign-in-pw-result">

                <section id="signInPwResult" className='pwReset'>
                    <div className="container">
                        <div className="gap">
                            <div className="title">
                                <h2>비밀번호 재설정</h2>
                            </div>
                            <div className="content">
                                <ul>
                                    <li>
                                        <label htmlFor="pw1">새 비밀번호 등록</label>
                                        <input 
                                            type="password" 
                                            name='pw1' 
                                            id='pw1' 
                                            placeholder='새 비밀번호를 입력해 주세요.'
                                            maxLength={16}
                                            onChange={onChangePw1}
                                            value={state.pw1}
                                            />
                                        <p className={`isError${state.isPw1_1 ? ' red' : ' green'}`}>{state.pw1Msg1}</p>                              
                                        <p className={`isError${state.isPw1_2 ? ' red' : ' green'}`}>{state.pw1Msg2}</p>                              
                                        <p className={`isError${state.isPw1_3 ? ' green' : ' red'}`}>{state.pw1Msg3}</p>                              
                                    </li>
                                    <li>
                                        <label htmlFor="pw2">새 비밀번호 확인</label>
                                        <input 
                                            type="password" 
                                            name='pw2' 
                                            id='pw2' 
                                            placeholder='새 비밀번호를 한 번 더 입력해 주세요.'
                                            maxLength={16}
                                            onChange={onChangePw2}
                                            value={state.pw2}
                                            />
                                        <p className={`isError${state.isPw2 ? ' green' : ' red'}`}>{state.pw2Msg}</p>                             
                                    </li>
                                    <li>        
                                        <button 
                                            onClick={onClickSubmit} 
                                            type='submit' 
                                            title='확인'
                                            className={state.isPwReset ? 'on' : ''} 
                                            disabled={!state.isPwReset}
                                            >확인</button>
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

export default SignInPwResultComponent