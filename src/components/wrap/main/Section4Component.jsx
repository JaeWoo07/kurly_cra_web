import React from 'react';
import $ from 'jquery';

function Section4Component(){

    React.useEffect(()=>{

        let setId = 0;

        function saleEndTimer(){
            // 1.
            // 시스템의 타이머를 이용해야 새로고침 해도 타이머 유지
            // 시작 시점 부터 24시간 (브라우저 메모리(로컬 스토리지)에 저장)
            let start = new Date('2023-04-12 19:00:00'); // 타임 세일 시작 시점
            let nowDate = new Date();
        
            // 2.
            // console.log('세일 시작 일 시간 : ' + start);

            start.setHours(start.getHours() + 24);  // 24시간 설정(세터함수)
            // start.setDate(start.getDate() + 1);  // = 1일 설정(세터함수)

            // console.log('세일 종료 일 시간 : ' + start);

            // 3. 세일 종료 시간과 현재 시간의 차이 계산 = 세일 종료까지 남은 시간
            let endTime = start - nowDate;
            // console.log(endTime); // 1/1000초 단위 밀리초

            // 4. 일, 시, 분, 초
            // 일
            // let endDate = Math.floor(endTime / (60 * 60 * 24 * 1000));  // endTime / (60분 * 60초 * 24시간 * 1000)
            // console.log(endDate + '일');

            // 시
            let endHour = Math.floor((endTime / (60 * 60 * 1000)) % 24);  // (endTime / (60분 * 60초 * 1000)) % 24시간 
            // console.log(endHour + '시');

            // 분
            let endMinute = Math.floor((endTime / (60 * 1000)) % 60);  // (endTime / (60초 * 1000)) % 60분 
            // console.log(endMinute + '분');

            // 초
            let endSecond = Math.floor(endTime / 1000 % 60);  // (endTime / 1000 % 60)
            // console.log(endSecond + '초');


            function displayTime(){
                $('#section4 .timer-second').text(endSecond < 10 ? `0${endSecond}` : endSecond);  // 초
                $('#section4 .timer-minute').text(endMinute < 10 ? `0${endMinute}` : endMinute);  // 분
                $('#section4 .timer-hour').text(endHour < 10 ? `0${endHour}` : endHour);  // 시
            };


            if(nowDate >= start){
                clearInterval(setId);
                endSecond = 0;
                endMinute = 0;
                endHour = 0;
                displayTime();
            }
            else{
                displayTime();
            }      
        };
    
        clearInterval(setId);
        setId = setInterval(saleEndTimer, 1000);


        // // 타이머
        // // 60초가 지나면 1분이 감소
        // // 60분이 지나면 1시간이 감소
        // let h = 23;  // 0 ~ 23: 24시간 카운트
        // let m = 59;  // 0 ~ 59: 60분
        // let s = 59;  // 0 ~ 59: 60초
        // let setId = 0;
        
        // function timerFn(){
        //     s--;
        //     if(s < 0){  // 60초 카운트 완료
        //         s = 59;  // 초기화
        //         m--;
        //         if(m < 0){  // 60분 카운트 완료
        //             m = 59;  // 초기화
        //             h--;
        //             if(h < 0){  // 24시간 카운트 완료
        //                 clearInterval(setId);  // 타이머 종료
        //                 s = 0;  // 타이머 종료 초기화  
        //                 m = 0;  // 타이머 종료 초기화
        //                 h = 0;  // 타이머 종료 초기화
        //             }
        //         }
        //     }

        //     $('#section4 .timer-second').text(s < 10 ? `0${s}` : s);  // 초
        //     $('#section4 .timer-minute').text(m < 10 ? `0${m}` : m);  // 분
        //     $('#section4 .timer-hour').text(h < 10 ? `0${h}` : h);  // 시
        // };

        // setId = setInterval(timerFn, 1000);  // 1초 간격으로 호출 실행

    }, []);


    return (
        <section id="section4">
            <div className="container">
                <div className="content">
                    <ul>
                        <li>
                            <div className="gap">
                                <h2>선물세트특가</h2>
                                <h3>24시간 선물세트 한정특가</h3>
                                <div className="timer-box">
                                    <span className="timer-svg-image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" preserveAspectRatio="xMidYMid meet" style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}><defs><clipPath id="__lottie_element_2"><rect width="36" height="36" x="0" y="0"></rect></clipPath></defs><g clipPath="url(#__lottie_element_2)"><g transform="matrix(1,0,0,1,3.75,3.75)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,14.25,14.25)"><path fill="rgb(189,118,255)" fillOpacity="1" d=" M14,0 C14,7.73199987411499 7.73199987411499,14 0,14 C-7.73199987411499,14 -14,7.73199987411499 -14,0 C-14,-7.73199987411499 -7.73199987411499,-14 0,-14 C7.73199987411499,-14 14,-7.73199987411499 14,0z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M14.25,8.293999671936035 C14.25,8.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g><g opacity="1" transform="matrix(1,-0.00000695616699886159,0.00000695616699886159,1,-0.00009918212890625,0.00009918212890625)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M20.25,14.293999671936035 C20.25,14.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g></g></g></svg></span>
                                    <span className="timer-hour">{/* 23 */}</span><strong>:</strong><span className="timer-minute">{/* 59 */}</span><strong>:</strong><span className="timer-second">{/* 59 */}</span>
                                    <h3>망설이면 늦어요!</h3>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="gap">
                                <a href="!#" onClick={e => e.preventDefault()}>
                                    <div className="img-box">
                                        <img src="./img/sec4_gift1.jpg" alt=""/>
                                        <strong>선물특가</strong>
                                        <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                    </div>
                                    <div className="txt-box">
                                        <h3>맑고 깔끔하게 즐기는 사과의 풍미</h3>
                                        <h2>영주 햇살듬뿍 사과즙 30포</h2>
                                        <h3><strong>41%</strong><em>7,500원</em><s>12,900원</s></h3>
                                        <h5>후기<span>852</span></h5>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="gap">
                                <a href="!#" onClick={e => e.preventDefault()}>
                                    <div className="img-box">
                                        <img src="./img/sec4_gift2.jpg" alt=""/>
                                        <strong>선물특가</strong>
                                        <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                    </div>
                                    <div className="txt-box">
                                        <h3>눈 건강과 활력을 한번에</h3>
                                        <h2>덴프스 트루바이타민 l (30일분)</h2>
                                        <h3><strong>58%</strong><em>32,900원</em><s>80,000원</s></h3>
                                        <h5>후기<span>148</span></h5>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Section4Component;