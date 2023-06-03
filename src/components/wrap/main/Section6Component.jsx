import React from 'react';
import $ from 'jquery';

function Section6Component(){

    React.useEffect(()=>{

        let setId = 0;

        function saleEndTimer(){

            // 종료 시점이 23:00:00
            const newDate = new Date(); 

            // 1.
            // 시스템의 타이머를 이용해야 새로고침 해도 타이머 유지
            // 시작 시점 부터 24시간 (브라우저 메모리(로컬 스토리지)에 저장)
            let start = new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} 18:00:00`); // 매일 밤 11시 타임세일 종료 (6시부터 5시간 타이머)
            let nowDate = new Date();
        
            // 2. 5시간 세팅
            // console.log('세일 시작 일 시간 : ' + start);

            start.setHours(start.getHours() + 5);  // 5시간 설정(세터함수)

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
                $('#section6 .timer-second').text(endSecond < 10 ? `0${endSecond}` : endSecond);  // 초
                $('#section6 .timer-minute').text(endMinute < 10 ? `0${endMinute}` : endMinute);  // 분
                $('#section6 .timer-hour').text(endHour < 10 ? `0${endHour}` : endHour);  // 시
            };


            if(nowDate >= start){
                clearInterval(setId);
                endSecond = 0;
                endHour = 0;
                endMinute = 0;
                displayTime();
            }
            else{
                displayTime();
            }           
        };
    
        clearInterval(setId);
        setId = setInterval(saleEndTimer, 1000);

        // let h = 4;
        // let m = 59;
        // let s = 59;
        // let setId = 0;
        // function timerFn(){
        //     s--;
        //     if(s < 0){
        //         s = 59;
        //         m--;
        //         if(m < 0){
        //             m = 59;
        //             h--;
        //             if(h < 0){
        //                 clearInterval(setId);
        //                 s = 0;
        //                 m = 0;
        //                 h = 0;
        //             }
        //         }
        //     }
        //     $('#section6 .timer-second').text(s < 10 ? `0${s}` : s);
        //     $('#section6 .timer-minute').text(m < 10 ? `0${m}` : m);
        //     $('#section6 .timer-hour').text(h < 10 ? `0${h}` : h);
        // };
        // setId = setInterval(timerFn, 1000);

    }, []);


    return (
        <section id="section6">
            <div className="container">
                <div className="content">
                    <ul>
                        <li>
                            <div className="gap">
                                <h2>선착순 1천 개 한정</h2>
                                <h3>매일 저녁6시 한정수량 오픈!</h3>
                                <div className="timer-box">
                                    <span className="timer-svg-image"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" preserveAspectRatio="xMidYMid meet" style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}><defs><clipPath id="__lottie_element_2"><rect width="36" height="36" x="0" y="0"></rect></clipPath></defs><g clipPath="url(#__lottie_element_2)"><g transform="matrix(1,0,0,1,3.75,3.75)" opacity="1" style={{display: "block"}}><g opacity="1" transform="matrix(1,0,0,1,14.25,14.25)"><path fill="rgb(189,118,255)" fillOpacity="1" d=" M14,0 C14,7.73199987411499 7.73199987411499,14 0,14 C-7.73199987411499,14 -14,7.73199987411499 -14,0 C-14,-7.73199987411499 -7.73199987411499,-14 0,-14 C7.73199987411499,-14 14,-7.73199987411499 14,0z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M14.25,8.293999671936035 C14.25,8.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g><g opacity="1" transform="matrix(1,-0.00000695616699886159,0.00000695616699886159,1,-0.00009918212890625,0.00009918212890625)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M20.25,14.293999671936035 C20.25,14.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g></g></g></svg></span>
                                    <span className="timer-hour">{/* 04 */}</span><strong>:</strong><span className="timer-minute">{/* 59 */}</span><strong>:</strong><span className="timer-second">{/* 59 */}</span>
                                    <h3>망설이면 늦어요!</h3>
                                </div>

                            </div>
                        </li>
                        <li>
                            <div className="gap">
                                <a href="!#" onClick={e => e.preventDefault()}>
                                    <div className="img-box">
                                        <img src="./img/sec6_img1.jpg" alt=""/>
                                        <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                    </div>
                                    <div className="txt-box">
                                        <h3>부담 없이 즐기는 바삭 촉촉 옛날 통닭</h3>
                                        <h2>두 마리 99치킨 (에어프라이어용) 매일 18시 선착순 판매</h2>
                                        <h3><em>9,900원</em></h3>
                                        <h5>후기<span>999+</span></h5>                       
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

export default Section6Component;