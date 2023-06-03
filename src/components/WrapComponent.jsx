import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import TopModalComponent from './wrap/TopModalComponent.jsx';
import HeaderComponent from './wrap/HeaderComponent.jsx';
import MainComponent from './wrap/MainComponent.jsx';
import FooterComponent from './wrap/FooterComponent.jsx';
// import QuickMenuComponent from './wrap/QuickMenuComponent.jsx';
import QuickMenuLayOut from './wrap/QuickMenuLayOut.jsx';
import GoTopComponent from './wrap/GoTopComponent.jsx';
import Sub1Component from './wrap/sub_page/Sub1Component.jsx';
import Sub2Component from './wrap/sub_page/Sub2Component.jsx';
import Sub3Component from './wrap/sub_page/Sub3Component.jsx';
import Sub4Component from './wrap/sub_page/Sub4Component.jsx';
import SignUpComponent from './wrap/sub_page/SignUpComponent.jsx';
import SignInComponent from './wrap/sub_page/SignInComponent.jsx';
import SignInIdSearchComponent from './wrap/sub_page/SignInIdSearchComponent.jsx';
import SignInIdResultComponent from './wrap/sub_page/SignInIdResultComponent.jsx';
import SignInPwSearchComponent from './wrap/sub_page/SignInPwSearchComponent.jsx';
import SignInPwResultComponent from './wrap/sub_page/SignInPwResultComponent.jsx'
import DeliveryComponent from './wrap/sub_page/DeliveryComponent.jsx';
import MyPage from './wrap/sub_page/MyPage.jsx';
import KurlyIntroduction from './wrap/sub_page/KurlyIntroduction.jsx';
import UserGuide from './wrap/sub_page/UserGuide.jsx';
import Agreement from './wrap/sub_page/Agreement.jsx';
import PrivacyPolicy from './wrap/sub_page/PrivacyPolicy.jsx';
import NoticeBoard2Component from './wrap/sub_page/NoticeBoard2Component.jsx';
import NoticeBoard3Component from './wrap/sub_page/NoticeBoard3Component.jsx';
import NoticeBoard4Component from './wrap/sub_page/NoticeBoard4Component.jsx';
import NoticeInsertComponent from './wrap/sub_page/board_notice/NoticeInsertComponent.jsx';
import NoticeSelectComponent from './wrap/sub_page/board_notice/NoticeSelectComponent.jsx';
import NoticeViewComponent from './wrap/sub_page/board_notice/NoticeViewComponent.jsx';
import NoticeUpdateComponent from './wrap/sub_page/board_notice/NoticeUpdateComponent.jsx';


function WrapComponent(){

    // 타이머 카운트 상태관리
    // 초, 분, 메모리 관리 변수, 메시지 변수
    const [state,setState] = React.useState({
        seconds: 59,
        minutes: 2,
        setId: 0,
        timerMsg: '',
        timerEnd: false,
        // 모달 상태 관리
        isModal: true
    });


    const [login, setLogin] = React.useState({
        name: '', // 로그인 이름,
        key: ''
    })


    // 로그인 이름
    const signInName=(name, key)=>{
        setLogin({
            ...login,
            name: name,
            key: key
        }); 
    }

    const logout=()=>{
        setLogin({
            ...login,
            name: "",
            key: ""
        })
    }



    const loginState=()=>{
        
        try{    
            let cookies = document.cookie.split(';');
            cookies = cookies.map((item) => item.split('=')[0].trim() );

            for(let i = 0; i < localStorage.length; i++){
                const result = localStorage.key(i).split('_');
                if(result[0] === 'JW' && cookies.includes(localStorage.key(i)) === true ){
                    const loginData = JSON.parse(localStorage.getItem( localStorage.key(i) ));
                    signInName(loginData.name, localStorage.key(i));
                    return;
                }
                else if(result[0] === 'JW' && cookies.includes(localStorage.key(i)) === false ){
                    localStorage.removeItem(localStorage.key(i));                
                }                      
            }         
        }
        catch(e){
            console.log(e);
        }
    }


    React.useEffect(()=>{
        loginState();
    },[state.name]);




    // 타이머 카운터 함수
    // 휴대폰 인증 번호를 발송하고 모달창 닫기를 클릭하면
    // 타이머가 시작된다.(함수 호출실행)
    const timerCounterFn=()=>{
        // 임시변수
        let seconds= 59;
        let minutes= 2;
        let setId= 0;
        let timerMsg= '';
        let timerEnd = false;

        setId = setInterval(function(){

            seconds--;  // 1초에 1씩 감소하는 카운트
            if(seconds < 0){ // 60초
                minutes--;
                seconds = 59;
                if(minutes < 0){ // 3분 카운터 종료
                    seconds = 0;
                    minutes = 0;
                    clearInterval(setId);
                    timerMsg = '유효 시간이 만료되었습니다. 다시 시도해 주세요.';
                    timerEnd = true;
                }
            }
            
            setState({
                ...state,
                seconds: seconds,
                minutes: minutes,
                timerMsg: timerMsg,
                timerEnd: timerEnd,
                setId: setId
            });

        }, 1000);
    }


    // 모달창 닫기 이벤트 함수
    const modalClose=()=>{
        setState({
            ...state,
            isModal:false
        });
    }

    // 쿠키 가져오기 그리고 모달창의 쿠키 이름이 있으면 열리지 않음
    // 만약 해당 쿠키 이름이 없다면 모달창 열림
    // 홈페이지 로딩 시 수시로 작동
    const getCookie=()=>{
        // 1. 쿠키 가져오기
        if(document.cookie === '') return;  // 쿠키가 없으면 강제 종료

        const result = document.cookie.split(';'); // 구분기호(;) 단위로 배열처리
        // document.cookie = `TOPMODAL = kurly_top_modal; path =/; expires = ${newDate.toUTCString()};`;
        // 배열로 저장
        let arr = [];
        result.map((item, idx)=>{
            arr[idx] = {
                쿠키이름: item.split('=')[0].trim(),
                쿠키값: item.split('=')[1].trim()
            }
        });

        // arr 배열에 있는 쿠키이름 비교
        arr.map((item)=>{
            if(item.쿠키이름 === "TOPMODAL" && item.쿠키값 === "kurly_top_modal"){  // 쿠키가 있다면 모달창 열지 않음 
                setState({
                    ...state,
                    isModal: false
                });
            }
            else{  // 쿠키가 없으면 모달창 열기
                setState({
                    ...state,
                    isModal: true
                });
            }
        });

    }


    React.useEffect(()=>{
        getCookie();
    }, [state.isModal]);




    return(
        <div id="wrap">

            {
                state.isModal && <TopModalComponent modalClose={modalClose}/>
            }
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ScrollToTop/>
                <Routes>
                    <Route path='/' element={<HeaderComponent login={login} logout={logout}/>}>
                        <Route index element={<MainComponent/>}/>
                        <Route element={<QuickMenuLayOut/>}>
                            <Route path='/메인' element={<MainComponent/>}/>
                        </Route>
                        <Route element={<QuickMenuLayOut/>}> 
                            <Route index element={<MainComponent/>}/>
                        </Route>
                        <Route element={<QuickMenuLayOut/>}>
                            <Route path='/신상품' element={<Sub1Component/>}/>
                            <Route path='/베스트' element={<Sub2Component/>}/>
                            <Route path='/알뜰쇼핑' element={<Sub3Component/>}/>
                        </Route>                                                        
                        <Route path='/특가혜택' element={<Sub4Component/>}/>                      
                        <Route path='/회원가입' element={<SignUpComponent timerCounterFn={timerCounterFn} timer={state}/>}/>   
                        <Route path='/로그인' element={<SignInComponent signInName={signInName}/>}/>
                        <Route path='/마이페이지' element={<MyPage/>}/>
                        <Route path='/아이디찾기' element={<SignInIdSearchComponent timerCounterFn={timerCounterFn} timer={state}/>}/>
                        <Route path='/아이디찾기결과' element={<SignInIdResultComponent/>}/>
                        <Route path='/비밀번호찾기' element={<SignInPwSearchComponent timerCounterFn={timerCounterFn} timer={state}/>}/>
                        <Route path='/비밀번호찾기결과' element={<SignInPwResultComponent/>}/>
                        <Route element={<QuickMenuLayOut/>}>                           
                            <Route path='/공지사항' element={<NoticeSelectComponent login={login}/>}/>
                            <Route path='/자주하는질문' element={<NoticeBoard2Component/>}/>
                            <Route path='/1대1문의' element={<NoticeBoard3Component/>}/>
                            <Route path='/대량주문문의' element={<NoticeBoard4Component/>}/>
                        </Route>
                        <Route path='/공지사항수정' element={<NoticeUpdateComponent/>}/>
                        <Route path='/공지사항입력' element={<NoticeInsertComponent/>}/>
                        <Route path='/공지사항글보기' element={<NoticeViewComponent login={login}/>}/>
                        <Route path='/배송안내' element={<DeliveryComponent/>}/>
                        <Route path='/컬리소개' element={<KurlyIntroduction/>}/>                                      
                        <Route path='/이용약관' element={<Agreement/>}/>                                     
                        <Route path='/개인정보처리방침' element={<PrivacyPolicy/>}/>                                     
                        <Route path='/이용안내' element={<UserGuide/>}/>                                     
                    </Route>                   
                </Routes>
                <FooterComponent/>
                {/* <QuickMenuComponent/> */}
                <GoTopComponent/>              
            </BrowserRouter>

            {/* <FooterComponent/> */}
            {/* <QuickMenuComponent/> */}
            {/* <GoTopComponent/> */}
        </div>
    );
};

export default WrapComponent;