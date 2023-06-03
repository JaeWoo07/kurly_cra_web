import React from 'react';
import $ from 'jquery';

function Section1Component(){

    React.useEffect(()=>{

            // 섹션1 메인슬라이드 /////////////////////////////////////////////////////////////////////
            let cnt = 0;
            let setId = 0;
            let total = $('#section1 .slide').length - 2;
            $('#section1 .total-number').html(total);
            $('#section1 .slide-next-btn').stop().fadeOut(0);
            $('#section1 .slide-prev-btn').stop().fadeOut(0);
            mainSlide();

            function mainSlide(){
                // console.log(cnt);
                $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300, function(){
                    if(cnt >= total){
                        cnt = 0;
                    };
                    if(cnt < 0){
                        cnt = total - 1;
                    };
                    $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 0);
                });
                $('#section1 .current-number').html(cnt + 1 === total + 1 ? 1 : (cnt + 1 === 0 ? total : cnt + 1));
            };

            function nextCount(){
                cnt++;
                mainSlide();
            };

            function prevCount(){
                cnt--;
                mainSlide();
            };

            function autoTimer(){
                clearInterval(setId);
                setId = setInterval(nextCount, 3000);
                sessionStorage.setItem('SETID', setId);
            };
            autoTimer();

            $('#section1 .slide-container').on({
                mouseenter: function(){
                    clearInterval(setId);
                    $('#section1 .slide-next-btn').stop().fadeIn(300);
                    $('#section1 .slide-prev-btn').stop().fadeIn(300);
                }
            });


            $('#section1 .slide-container').on({
                mouseleave: function(){
                    autoTimer();
                    $('#section1 .slide-next-btn').stop().fadeOut(300);
                    $('#section1 .slide-prev-btn').stop().fadeOut(300);
                }
            });


            $('#section1 .slide-next-btn').on({
                click: function(e){
                    e.preventDefault();
                    if($('#section1 .slide-wrap').is(':animated') === false){
                        nextCount();
                    }
                }
            });


            $('#section1 .slide-prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    if(!$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                    };
                }
            });


            // 터치 스와이프: 마우스 이벤트
            let touchStart = null;
            let touchEnd = null;

            // 드래그 앤드 드롭 (잡아서 끌고 그리고 놓기)
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false; // 처음부터 초기값 설정
            let winW = $(window).innerWidth();
     
            $('#section1 .slide-container').on({
                mousedown: function(e){
                    e.preventDefault();
                    winW = $(window).innerWidth();
                    touchStart = e.clientX;
                    // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
                    dragStart = e.clientX - $('#section1 .slide-wrap').offset().left - winW;
                    mouseDown = true; // 마우스 다운 드래그 시작
                    // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
                },
                mouseup: function(e){
                    e.preventDefault();
                    touchEnd = e.clientX;
                    // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
                    // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

                    // 방향 결정
                    if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
                        if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount();
                        }                      
                    }
                    if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                        if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount();
                        }               
                    }

                    mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
                },
                mouseleave: function(e){
                    
                     // 마우스가 영역을 떠나면 마우스 업상태로 인식을 못 함
                     // mouseup 상태로 간주
                     if(mouseDown === false){
                        return;  // 마우스 다운 상태가 아니면 리턴(탈출)
                    }
                    
                    touchEnd = e.clientX;
                    // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
                    // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

                    // 방향 결정
                    if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
                        if(!$('#section1 .slide-wrap').is(':animated')){
                            nextCount();
                        }                      
                    }
                    if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                        if(!$('#section1 .slide-wrap').is(':animated')){
                            prevCount();
                        }               
                    }

                    mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                      
                },
                mousemove: function(e){
                    e.preventDefault();
                    // if(!mouseDown === false){
                    if(mouseDown === false){
                        return;  // 마우스 다운 상태가 아니면 리턴(탈출)
                    }
                    dragEnd = e.clientX;
                    // 실제 드래그 상태 스타일 애니메이션
                    // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
                    $('#section1 .slide-wrap').css({left: dragEnd - dragStart});
                }
            });

            // 새로고침 방지
           $('#section1 .slide-wrap').on({
            click: function(e){
                if(touchStart - touchEnd !== 0){
                    e.preventDefault();
                }
            }
           });

           // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
           // 터치 스와이프
           // 드래그 앤 드롭
           $('#section1 .slide-container').on({
            touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
                e.preventDefault();
                clearInterval(setId);

                // console.log('touchstart');
                // console.log(e);
                // console.log(e.originalEvent.changedTouches[0].clientX);
              
                winW = $(window).innerWidth();
                touchStart = e.originalEvent.changedTouches[0].clientX;
                // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
                dragStart = e.originalEvent.changedTouches[0].clientX - $('#section1 .slide-wrap').offset().left - winW;
                mouseDown = true; // 마우스 다운 드래그 시작
                // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
            },
            touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
                e.preventDefault();
                
                autoTimer();
                touchEnd = e.originalEvent.changedTouches[0].clientX;
                // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
                // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

                // 방향 결정
                if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
                    if(!$('#section1 .slide-wrap').is(':animated')){
                        nextCount();
                    }                      
                }
                if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                    if(!$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                    }               
                }

                mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
            },
            touchmove: function(e){   // 손가락 이벤트 터치 무브 === mousemove
                e.preventDefault();
                // if(!mouseDown === false){
                if(mouseDown === false){
                    return;  // 마우스 다운 상태가 아니면 리턴(탈출)
                }
                dragEnd = e.originalEvent.changedTouches[0].clientX;
                // 실제 드래그 상태 스타일 애니메이션
                // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
                $('#section1 .slide-wrap').css({left: dragEnd - dragStart});
            }
        });

    }, []);


    return (
        <section id="section1">
            <div className="slide-container">
                <div className="slide-view">
                    <ul className="slide-wrap">
                        <li className="slide slide14"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_14.jpg" alt=""/></a></li>
                        <li className="slide slide1"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_1.jpg" alt=""/></a></li>
                        <li className="slide slide2"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_2.jpg" alt=""/></a></li>
                        <li className="slide slide3"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_3.jpg" alt=""/></a></li>
                        <li className="slide slide4"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_4.jpg" alt=""/></a></li>
                        <li className="slide slide5"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_5.jpg" alt=""/></a></li>
                        <li className="slide slide6"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_6.jpg" alt=""/></a></li>
                        <li className="slide slide7"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_7.jpg" alt=""/></a></li>
                        <li className="slide slide8"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_8.jpg" alt=""/></a></li>
                        <li className="slide slide9"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_9.jpg" alt=""/></a></li>
                        <li className="slide slide10"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_10.jpg" alt=""/></a></li>
                        <li className="slide slide11"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_11.jpg" alt=""/></a></li>
                        <li className="slide slide12"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_12.jpg" alt=""/></a></li>
                        <li className="slide slide13"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_13.jpg" alt=""/></a></li>
                        <li className="slide slide14"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_14.jpg" alt=""/></a></li>
                        <li className="slide slide1"><a href="!#" onClick={e => e.preventDefault()}><img src="./img/slide_img_1.jpg" alt=""/></a></li>
                    </ul>
                </div>
                {/* <!-- 좌우 화살 버튼 --> */}
                <a href="!#" className="slide-next-btn" title="next"><img src="./img/arrow.svg" alt=""/></a>
                <a href="!#" className="slide-prev-btn" title="preview"><img src="./img/arrow.svg" alt=""/></a>
                {/* <!-- 슬라이드 페이지 번호(인디게이터 번호) --> */}
                <div className="page-count">
                    <span className="current-number"></span>
                    <span>/</span>
                    <span className="total-number"></span>
                </div>
            </div>
        </section>
    );
};

export default Section1Component;