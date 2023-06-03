(function($){

    // 변수의 중복 사용 문제 해결하기 위해 객체를 사용한다.
    const obj = {
        init: function(){
            // this.section1();
            // this.section2();
            // this.section4();
            // this.section5();
            // this.section6();
            // this.section7();
            // this.section8();
        },
        // section1: function(){
        //     // 섹션1 메인슬라이드 /////////////////////////////////////////////////////////////////////
        //     let cnt = 0;
        //     let setId = 0;
        //     let total = $('#section1 .slide').length - 2;
        //     $('#section1 .total-number').html(total);
        //     $('#section1 .slide-next-btn').stop().fadeOut(0);
        //     $('#section1 .slide-prev-btn').stop().fadeOut(0);
        //     mainSlide();

        //     function mainSlide(){
        //         // console.log(cnt);
        //         $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300, function(){
        //             if(cnt >= total){
        //                 cnt = 0;
        //             };
        //             if(cnt < 0){
        //                 cnt = total - 1;
        //             };
        //             $('#section1 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 0);
        //         });
        //         $('#section1 .current-number').html(cnt + 1 === total + 1 ? 1 : (cnt + 1 === 0 ? total : cnt + 1));
        //     };

        //     function nextCount(){
        //         cnt++;
        //         mainSlide();
        //     };

        //     function prevCount(){
        //         cnt--;
        //         mainSlide();
        //     };

        //     function autoTimer(){
        //         clearInterval(setId);
        //         setId = setInterval(nextCount, 3000);
        //     };
        //     autoTimer();

        //     $('#section1 .slide-container').on({
        //         mouseenter: function(){
        //             clearInterval(setId);
        //             $('#section1 .slide-next-btn').stop().fadeIn(300);
        //             $('#section1 .slide-prev-btn').stop().fadeIn(300);
        //         }
        //     });


        //     $('#section1 .slide-container').on({
        //         mouseleave: function(){
        //             autoTimer();
        //             $('#section1 .slide-next-btn').stop().fadeOut(300);
        //             $('#section1 .slide-prev-btn').stop().fadeOut(300);
        //         }
        //     });


        //     $('#section1 .slide-next-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //             if($('#section1 .slide-wrap').is(':animated') === false){
        //                 nextCount();
        //             }
        //         }
        //     });


        //     $('#section1 .slide-prev-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //             if(!$('#section1 .slide-wrap').is(':animated')){
        //                 prevCount();
        //             };
        //         }
        //     });


        //     // 터치 스와이프: 마우스 이벤트
        //     let touchStart = null;
        //     let touchEnd = null;

        //     // 드래그 앤드 드롭 (잡아서 끌고 그리고 놓기)
        //     let dragStart = null;
        //     let dragEnd = null;
        //     let mouseDown = false; // 처음부터 초기값 설정
        //     let winW = $(window).innerWidth();
     
        //     $('#section1 .slide-container').on({
        //         mousedown: function(e){
        //             e.preventDefault();
        //             winW = $(window).innerWidth();
        //             touchStart = e.clientX;
        //             // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //             dragStart = e.clientX - $('#section1 .slide-wrap').offset().left - winW;
        //             mouseDown = true; // 마우스 다운 드래그 시작
        //             // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //         },
        //         mouseup: function(e){
        //             e.preventDefault();
        //             touchEnd = e.clientX;
        //             // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //             // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //             // 방향 결정
        //             if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                 if(!$('#section1 .slide-wrap').is(':animated')){
        //                     nextCount();
        //                 }                      
        //             }
        //             if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                 if(!$('#section1 .slide-wrap').is(':animated')){
        //                     prevCount();
        //                 }               
        //             }

        //             mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
        //         },
        //         mouseleave: function(e){
                    
        //              // 마우스가 영역을 떠나면 마우스 업상태로 인식을 못 함
        //              // mouseup 상태로 간주
        //              if(mouseDown === false){
        //                 return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //             }
                    
        //             touchEnd = e.clientX;
        //             // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //             // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //             // 방향 결정
        //             if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                 if(!$('#section1 .slide-wrap').is(':animated')){
        //                     nextCount();
        //                 }                      
        //             }
        //             if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                 if(!$('#section1 .slide-wrap').is(':animated')){
        //                     prevCount();
        //                 }               
        //             }

        //             mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                      
        //         },
        //         mousemove: function(e){
        //             e.preventDefault();
        //             // if(!mouseDown === false){
        //             if(mouseDown === false){
        //                 return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //             }
        //             dragEnd = e.clientX;
        //             // 실제 드래그 상태 스타일 애니메이션
        //             // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //             $('#section1 .slide-wrap').css({left: dragEnd - dragStart});
        //         }
        //     });

        //     // 새로고침 방지
        //    $('#section1 .slide-wrap').on({
        //     click: function(e){
        //         if(touchStart - touchEnd !== 0){
        //             e.preventDefault();
        //         }
        //     }
        //    });

        //    // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
        //    // 터치 스와이프
        //    // 드래그 앤 드롭
        //    $('#section1 .slide-container').on({
        //     touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
        //         e.preventDefault();
        //         clearInterval(setId);

        //         // console.log('touchstart');
        //         // console.log(e);
        //         // console.log(e.originalEvent.changedTouches[0].clientX);
              
        //         winW = $(window).innerWidth();
        //         touchStart = e.originalEvent.changedTouches[0].clientX;
        //         // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //         dragStart = e.originalEvent.changedTouches[0].clientX - $('#section1 .slide-wrap').offset().left - winW;
        //         mouseDown = true; // 마우스 다운 드래그 시작
        //         // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //     },
        //     touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
        //         e.preventDefault();
                
        //         autoTimer();
        //         touchEnd = e.originalEvent.changedTouches[0].clientX;
        //         // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //         // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //         // 방향 결정
        //         if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //             if(!$('#section1 .slide-wrap').is(':animated')){
        //                 nextCount();
        //             }                      
        //         }
        //         if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //             if(!$('#section1 .slide-wrap').is(':animated')){
        //                 prevCount();
        //             }               
        //         }

        //         mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
        //     },
        //     touchmove: function(e){   // 손가락 이벤트 터치 무브 === mousemove
        //         e.preventDefault();
        //         // if(!mouseDown === false){
        //         if(mouseDown === false){
        //             return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //         }
        //         dragEnd = e.originalEvent.changedTouches[0].clientX;
        //         // 실제 드래그 상태 스타일 애니메이션
        //         // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //         $('#section1 .slide-wrap').css({left: dragEnd - dragStart});
        //     }
        // });


        // },
        // section2: function(){
        //     // 섹션2 슬라이드 ////////////////////////////////////////////////////////////////
        //     let n = $('#section2 .slide').length / 4 - 1;  // 슬라이드 전체 갯수  2 = 8 / 4 (한 화면의 개수)
        //     // 1. 메인 슬라이드 함수
        //     let cnt = 0;
        //     // $('#section2 .prev-btn').hide();  // 처음에는 이전 버튼 안보이게.
        //     mainSlide(); // 로딩 시 실행

        //     function mainSlide(){
        //         $('#section2 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300);

        //         // 화살버튼 보이기, 숨기기
        //         if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
        //             $('#section2 .next-btn').hide();
        //         }
        //         else{  // 마지막이 아니면 버튼을 보인다.
        //             $('#section2 .next-btn').show();
        //         };


        //         if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //             $('#section2 .prev-btn').hide();
        //         }
        //         else{  // 처음이 아니면 버튼을 보인다.
        //             $('#section2 .prev-btn').show();
        //         }
        //     };

        //     // 2-1. 다음 카운트 함수
        //     function nextCount(){
        //         cnt++;
        //         // $('#section2 .prev-btn').show();  // 이전 버튼 초기화
        //         // if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
        //         //     $('#section2 .next-btn').hide();
        //         // }
        //         // else{  // 마지막이 아니면 버튼을 보인다.
        //         //     $('#section2 .next-btn').show();
        //         // };
        //         if(cnt > n){
        //             cnt = n;
        //         };
        //         mainSlide();
        //     };

        //     // 2-2. 이전 카운트 함수
        //     function prevCount(){
        //         cnt--;
        //         // $('#section2 .next-btn').show(); // 다음 버튼 초기화
        //         // if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //         //     $('#section2 .prev-btn').hide();
        //         // }
        //         // else{  // 처음이 아니면 버튼을 보인다.
        //         //     $('#section2 .prev-btn').show();
        //         // };
        //         if(cnt < 0){
        //             cnt = 0;
        //         };
        //         mainSlide();
        //     };

        //     // 3-1. 다음 화살버튼 클릭 이벤트
        //     $('#section2 .next-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //                 nextCount();
        //         }
        //     });

        //     // 3-2. 이전 화살버튼 클릭 이벤트
        //     $('#section2 .prev-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //                 prevCount();
        //         }
        //     });


        //     // 터치 스와이프: 마우스 이벤트
        //     let touchStart = null;
        //     let touchEnd = null;

        //     // 드래그 앤드 드롭 (잡아서 끌고 그리고 놓기)
        //     let dragStart = null;
        //     let dragEnd = null;
        //     let mouseDown = false; // 처음부터 초기값 설정
        //     let winW = $(window).innerWidth();
        //     let conW = $('#section2 .slide-container').innerWidth();
    
        //    $('#section2 .slide-container').on({
        //         mousedown: function(e){
        //             e.preventDefault();
        //             winW = $(window).innerWidth();
        //             touchStart = e.clientX;
        //             // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //             dragStart = e.clientX - $('#section2 .slide-wrap').offset().left + ((winW - conW) / 2);
        //             mouseDown = true; // 마우스 다운 드래그 시작
        //             // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //         },
        //         mouseup: function(e){
        //             e.preventDefault();
        //             touchEnd = e.clientX;
        //             // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //             // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //             // 방향 결정
        //             if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                 if(!$('#section2 .slide-wrap').is(':animated')){
        //                     nextCount();
        //                 }                      
        //             }
        //             if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                 if(!$('#section2 .slide-wrap').is(':animated')){
        //                     prevCount();
        //                 }               
        //             }

        //             mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.

        //         },
        //         mouseleave: function(e){
                    
        //             // 마우스가 영역을 떠나면 마우스 업상태로 인식을 못 함
        //             // mouseup 상태로 간주
        //             if(mouseDown === false){
        //                return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //            }
                   
        //            touchEnd = e.clientX;
        //            // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //            // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //            // 방향 결정
        //            if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                if(!$('#section2 .slide-wrap').is(':animated')){
        //                    nextCount();
        //                }                      
        //            }
        //            if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                if(!$('#section2 .slide-wrap').is(':animated')){
        //                    prevCount();
        //                }               
        //            }

        //            mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                      
        //        },
        //         mousemove: function(e){
        //             e.preventDefault();
        //             // if(!mouseDown === false){
        //             if(mouseDown === false){
        //                 return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //             }
        //             dragEnd = e.clientX;
        //             // 실제 드래그 상태 스타일 애니메이션
        //             // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //             $('#section2 .slide-wrap').css({left: dragEnd - dragStart});
        //         }
        //     });

        //     // 새로고침 방지
        //    $('#section2 .slide-wrap').on({
        //     click: function(e){
        //         if(touchStart - touchEnd !== 0){
        //             e.preventDefault();
        //         }
        //     }
        //    })


        //    // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
        //    // 터치 스와이프
        //    // 드래그 앤 드롭
        //    $('#section2 .slide-container').on({
        //     touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
        //         e.preventDefault();

        //         // console.log('touchstart');
        //         // console.log(e);
        //         // console.log(e.originalEvent.changedTouches[0].clientX);
              
        //         winW = $(window).innerWidth();
        //         touchStart = e.originalEvent.changedTouches[0].clientX;
        //         // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //         dragStart = e.originalEvent.changedTouches[0].clientX - $('#section2 .slide-wrap').offset().left + ((winW - conW) / 2);
        //         mouseDown = true; // 마우스 다운 드래그 시작
        //         // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //     },
        //     touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
        //         e.preventDefault();
        //         touchEnd = e.originalEvent.changedTouches[0].clientX;
        //         // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //         // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //         // 방향 결정
        //         if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //             if(!$('#section2 .slide-wrap').is(':animated')){
        //                 nextCount();
        //             }                      
        //         }
        //         if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //             if(!$('#section2 .slide-wrap').is(':animated')){
        //                 prevCount();
        //             }               
        //         }

        //         mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
        //     },
        //     touchmove: function(e){   // 손가락 이벤트 터치 무브 === mousemove
        //         e.preventDefault();
        //         // if(!mouseDown === false){
        //         if(mouseDown === false){
        //             return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //         }
        //         dragEnd = e.originalEvent.changedTouches[0].clientX;
        //         // 실제 드래그 상태 스타일 애니메이션
        //         // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //         $('#section2 .slide-wrap').css({left: dragEnd - dragStart});
        //     }
        // });

        // },
        // section4: function(){
        //     // 타이머
        //     let h = 23;  // 0 ~ 23: 24시간 카운트
        //     let m = 59;  // 0 ~ 59: 60분
        //     let s = 59;  // 0 ~ 59: 60초
        //     let setId = 0;

        //     // 60초가 지나면 1분이 감소
        //     // 60분이 지나면 1시간이 감소
        //     function timerFn(){
        //         s--;
        //         if(s < 0){  // 60초 카운트 완료
        //             s = 59;  // 초기화
        //             m--;
        //             if(m < 0){  // 60분 카운트 완료
        //                 m = 59;  // 초기화
        //                 h--;
        //                 if(h < 0){  // 24시간 카운트 완료
        //                     clearInterval(setId);  // 타이머 종료
        //                     s = 0;  // 타이머 종료 초기화  
        //                     m = 0;  // 타이머 종료 초기화
        //                     h = 0;  // 타이머 종료 초기화
        //                 }
        //             }
        //         }
        //         $('#section4 .timer-second').text(s < 10 ? `0${s}` : s);  // 초
        //         $('#section4 .timer-minute').text(m < 10 ? `0${m}` : m);  // 분
        //         $('#section4 .timer-hour').text(h < 10 ? `0${h}` : h);  // 시
        //     };
        //     setId = setInterval(timerFn, 1000);  // 1초 간격으로 호출 실행
        // },
        // section5: function(){
        //     let h = 23;
        //     let m = 59;
        //     let s = 59;
        //     let setId = 0;

        //     function timerFn(){
        //         s--;
        //         if(s < 0){
        //             s = 59;
        //             m--;
        //             if(m < 0){
        //                 m = 59;
        //                 h--;
        //                 if(h < 0){
        //                     clearInterval(setId);
        //                     s = 0;
        //                     m = 0;
        //                     h = 0;
        //                 }
        //             }
        //         }
        //         $('#section5 .timer-second').text(s < 10 ? `0${s}` : s);
        //         $('#section5 .timer-minute').text(m < 10 ? `0${m}` : m);
        //         $('#section5 .timer-hour').text(h < 10 ? `0${h}` : h);
        //     };
        //     setId = setInterval(timerFn, 1000);
        // },
        // section6: function(){
        //     let h = 4;
        //     let m = 59;
        //     let s = 59;
        //     let setId = 0;

        //     function timerFn(){
        //         s--;
        //         if(s < 0){
        //             s = 59;
        //             m--;
        //             if(m < 0){
        //                 m = 59;
        //                 h--;
        //                 if(h < 0){
        //                     clearInterval(setId);
        //                     s = 0;
        //                     m = 0;
        //                     h = 0;
        //                 }
        //             }
        //         }
        //         $('#section6 .timer-second').text(s < 10 ? `0${s}` : s);
        //         $('#section6 .timer-minute').text(m < 10 ? `0${m}` : m);
        //         $('#section6 .timer-hour').text(h < 10 ? `0${h}` : h);
        //     };
        //     setId = setInterval(timerFn, 1000);
        // },
        // section7: function(){
        //     // 섹션2 슬라이드 ////////////////////////////////////////////////////////////////
        //     let n = $('#section7 .slide').length / 4 - 1;  // 슬라이드 전체 갯수  2 = 8 / 4 (한 화면의 개수)
        //     // 1. 메인 슬라이드 함수
        //     let cnt = 0;
        //     // $('#section2 .prev-btn').hide();  // 처음에는 이전 버튼 안보이게.
        //     mainSlide(); // 로딩 시 실행

        //     function mainSlide(){
        //         $('#section7 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300);

        //         // 화살버튼 보이기, 숨기기
        //         if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
        //             $('#section7 .next-btn').hide();
        //         }
        //         else{  // 마지막이 아니면 버튼을 보인다.
        //             $('#section7 .next-btn').show();
        //         };


        //         if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //             $('#section7 .prev-btn').hide();
        //         }
        //         else{  // 처음이 아니면 버튼을 보인다.
        //             $('#section7 .prev-btn').show();
        //         }
        //     };

        //     // 2-1. 다음 카운트 함수
        //     function nextCount(){
        //         cnt++;
        //         // $('#section2 .prev-btn').show();  // 이전 버튼 초기화
        //         // if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
        //         //     $('#section2 .next-btn').hide();
        //         // }
        //         // else{  // 마지막이 아니면 버튼을 보인다.
        //         //     $('#section2 .next-btn').show();
        //         // };
        //         if(cnt > n){
        //             cnt = n;
        //         };
        //         mainSlide();
        //     };

        //     // 2-2. 이전 카운트 함수
        //     function prevCount(){
        //         cnt--;
        //         // $('#section2 .next-btn').show(); // 다음 버튼 초기화
        //         // if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //         //     $('#section2 .prev-btn').hide();
        //         // }
        //         // else{  // 처음이 아니면 버튼을 보인다.
        //         //     $('#section2 .prev-btn').show();
        //         // };
        //         if(cnt < 0){
        //             cnt = 0;
        //         };
        //         mainSlide();
        //     };

        //     // 3-1. 다음 화살버튼 클릭 이벤트
        //     $('#section7 .next-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //                 nextCount();
        //         }
        //     });

        //     // 3-2. 이전 화살버튼 클릭 이벤트
        //     $('#section7 .prev-btn').on({
        //         click: function(e){
        //             e.preventDefault();
        //                 prevCount();
        //         }
        //     });


        //     // 터치 스와이프: 마우스 이벤트
        //     let touchStart = null;
        //     let touchEnd = null;

        //     // 드래그 앤드 드롭 (잡아서 끌고 그리고 놓기)
        //     let dragStart = null;
        //     let dragEnd = null;
        //     let mouseDown = false; // 처음부터 초기값 설정
        //     let winW = $(window).innerWidth();
        //     let conW = $('#section7 .slide-container').innerWidth();
    
        //    $('#section7 .slide-container').on({
        //         mousedown: function(e){
        //             e.preventDefault();
        //             winW = $(window).innerWidth();
        //             touchStart = e.clientX;
        //             // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //             dragStart = e.clientX - $('#section7 .slide-wrap').offset().left + ((winW - conW) / 2);
        //             mouseDown = true; // 마우스 다운 드래그 시작
        //             // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //         },
        //         mouseup: function(e){
        //             e.preventDefault();
        //             touchEnd = e.clientX;
        //             // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //             // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //             // 방향 결정
        //             if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                 if(!$('#section7 .slide-wrap').is(':animated')){
        //                     nextCount();
        //                 }                      
        //             }
        //             if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                 if(!$('#section7 .slide-wrap').is(':animated')){
        //                     prevCount();
        //                 }               
        //             }

        //             mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.

        //         },
        //         mouseleave: function(e){
                    
        //             // 마우스가 영역을 떠나면 마우스 업상태로 인식을 못 함
        //             // mouseup 상태로 간주
        //             if(mouseDown === false){
        //                return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //            }
                   
        //            touchEnd = e.clientX;
        //            // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //            // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //            // 방향 결정
        //            if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                if(!$('#section7 .slide-wrap').is(':animated')){
        //                    nextCount();
        //                }                      
        //            }
        //            if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                if(!$('#section7 .slide-wrap').is(':animated')){
        //                    prevCount();
        //                }               
        //            }

        //            mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                      
        //        },
        //         mousemove: function(e){
        //             e.preventDefault();
        //             // if(!mouseDown === false){
        //             if(mouseDown === false){
        //                 return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //             }
        //             dragEnd = e.clientX;
        //             // 실제 드래그 상태 스타일 애니메이션
        //             // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //             $('#section7 .slide-wrap').css({left: dragEnd - dragStart});
        //         }
        //     });

        //     // 새로고침 방지
        //    $('#section7 .slide-wrap').on({
        //     click: function(e){
        //         if(touchStart - touchEnd !== 0){
        //             e.preventDefault();
        //         }
        //     }
        //    })


        //    // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
        //    // 터치 스와이프
        //    // 드래그 앤 드롭
        //    $('#section7 .slide-container').on({
        //     touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
        //         e.preventDefault();

        //         // console.log('touchstart');
        //         // console.log(e);
        //         // console.log(e.originalEvent.changedTouches[0].clientX);
              
        //         winW = $(window).innerWidth();
        //         touchStart = e.originalEvent.changedTouches[0].clientX;
        //         // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //         dragStart = e.originalEvent.changedTouches[0].clientX - $('#section7 .slide-wrap').offset().left + ((winW - conW) / 2);
        //         mouseDown = true; // 마우스 다운 드래그 시작
        //         // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //     },
        //     touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
        //         e.preventDefault();
        //         touchEnd = e.originalEvent.changedTouches[0].clientX;
        //         // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //         // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //         // 방향 결정
        //         if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //             if(!$('#section7 .slide-wrap').is(':animated')){
        //                 nextCount();
        //             }                      
        //         }
        //         if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //             if(!$('#section7 .slide-wrap').is(':animated')){
        //                 prevCount();
        //             }               
        //         }

        //         mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
        //     },
        //     touchmove: function(e){   // 손가락 이벤트 터치 무브 === mousemove
        //         e.preventDefault();
        //         // if(!mouseDown === false){
        //         if(mouseDown === false){
        //             return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //         }
        //         dragEnd = e.originalEvent.changedTouches[0].clientX;
        //         // 실제 드래그 상태 스타일 애니메이션
        //         // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //         $('#section7 .slide-wrap').css({left: dragEnd - dragStart});
        //     }
        // });

        // },
        // section8: function(){
        //      // 1. 메인 슬라이드 함수
        //      let cnt = 0;
        //      let n = $('#section8 .slide').length / 4 - 1;  // 슬라이드 전체 갯수  2 = 8 / 4 (한 화면의 개수)
        //      // $('#section2 .prev-btn').hide();  // 처음에는 이전 버튼 안보이게.
        //      mainSlide(); // 로딩 시 실행
 
        //      function mainSlide(){
        //          $('#section8 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300);
 
        //          // 화살버튼 보이기, 숨기기
        //          if(cnt >= 1){  // 마지막 위치이면 버튼을 숨긴다.
        //              $('#section8 .next-btn').hide();
        //          }
        //          else{  // 마지막이 아니면 버튼을 보인다.
        //              $('#section8 .next-btn').show();
        //          };
 
 
        //          if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //              $('#section8 .prev-btn').hide();
        //          }
        //          else{  // 처음이 아니면 버튼을 보인다.
        //              $('#section8 .prev-btn').show();
        //          }
        //      };
 
        //      // 2-1. 다음 카운트 함수
        //      function nextCount(){
        //          cnt++;
        //          // $('#section2 .prev-btn').show();  // 이전 버튼 초기화
        //          // if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
        //          //     $('#section2 .next-btn').hide();
        //          // }
        //          // else{  // 마지막이 아니면 버튼을 보인다.
        //          //     $('#section2 .next-btn').show();
        //          // };
        //          if(cnt > n){
        //             cnt = n;
        //          }
        //          mainSlide();
        //      };
 
        //      // 2-2. 이전 카운트 함수
        //      function prevCount(){
        //          cnt--;
        //          // $('#section2 .next-btn').show(); // 다음 버튼 초기화
        //          // if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
        //          //     $('#section2 .prev-btn').hide();
        //          // }
        //          // else{  // 처음이 아니면 버튼을 보인다.
        //          //     $('#section2 .prev-btn').show();
        //          // };
        //          if(cnt < 0){
        //             cnt = 0;
        //          }
        //          mainSlide();
        //      };
 
        //      // 3-1. 다음 화살버튼 클릭 이벤트
        //      $('#section8 .next-btn').on({
        //          click: function(e){
        //              e.preventDefault();
        //                  nextCount();
        //          }
        //      });
 
        //      // 3-2. 이전 화살버튼 클릭 이벤트
        //      $('#section8 .prev-btn').on({
        //          click: function(e){
        //              e.preventDefault();
        //                  prevCount();
        //          }
        //      });


        //     // 터치 스와이프: 마우스 이벤트
        //     let touchStart = null;
        //     let touchEnd = null;

        //     // 드래그 앤드 드롭 (잡아서 끌고 그리고 놓기)
        //     let dragStart = null;
        //     let dragEnd = null;
        //     let mouseDown = false; // 처음부터 초기값 설정
        //     let winW = $(window).innerWidth();
        //     let conW = $('#section8 .slide-container').innerWidth();

        //     $('#section8 .slide-container').on({
        //         mousedown: function(e){
        //             e.preventDefault();
        //             touchStart = e.clientX;
        //             // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //             dragStart = e.clientX - $('#section8 .slide-wrap').offset().left + ((winW - conW) / 2);
        //             mouseDown = true; // 마우스 다운 드래그 시작
        //             // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //         },
        //         mouseup: function(e){
        //             e.preventDefault();
        //             touchEnd = e.clientX;
        //             // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //             // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //             // 방향 결정
        //             if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                 if(!$('#section8 .slide-wrap').is(':animated')){
        //                     nextCount();
        //                 }                      
        //             }
        //             if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                 if(!$('#section8 .slide-wrap').is(':animated')){
        //                     prevCount();
        //                 }               
        //             }

        //             mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.

        //         },
        //         mouseleave: function(e){
                    
        //             // 마우스가 영역을 떠나면 마우스 업상태로 인식을 못 함
        //             // mouseup 상태로 간주
        //             if(mouseDown === false){
        //                return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //            }
                   
        //            touchEnd = e.clientX;
        //            // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //            // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //            // 방향 결정
        //            if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //                if(!$('#section8 .slide-wrap').is(':animated')){
        //                    nextCount();
        //                }                      
        //            }
        //            if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //                if(!$('#section8 .slide-wrap').is(':animated')){
        //                    prevCount();
        //                }               
        //            }

        //            mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                      
        //        },
        //         mousemove: function(e){
        //             e.preventDefault();
        //             // if(!mouseDown === false){
        //             if(mouseDown === false){
        //                 return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //             }
        //             dragEnd = e.clientX;
        //             // 실제 드래그 상태 스타일 애니메이션
        //             // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //             $('#section8 .slide-wrap').css({left: dragEnd - dragStart});
        //         }
        //     });

        //     // 새로고침 방지
        //    $('#section8 .slide-wrap').on({
        //     click: function(e){
        //         if(touchStart - touchEnd !== 0){
        //             e.preventDefault();
        //         }
        //     }
        //    });


        //    // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
        //    // 터치 스와이프
        //    // 드래그 앤 드롭
        //    $('#section8 .slide-container').on({
        //     touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
        //         e.preventDefault();
        //         // console.log('touchstart');
        //         // console.log(e);
        //         // console.log(e.originalEvent.changedTouches[0].clientX);
              
        //         winW = $(window).innerWidth();
        //         touchStart = e.originalEvent.changedTouches[0].clientX;
        //         // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
        //         dragStart = e.originalEvent.changedTouches[0].clientX - $('#section8 .slide-wrap').offset().left + ((winW - conW) / 2);
        //         mouseDown = true; // 마우스 다운 드래그 시작
        //         // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
        //     },
        //     touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
        //         e.preventDefault();
        //         touchEnd = e.originalEvent.changedTouches[0].clientX;
        //         // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
        //         // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

        //         // 방향 결정
        //         if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
        //             if(!$('#section8 .slide-wrap').is(':animated')){
        //                 nextCount();
        //             }                      
        //         }
        //         if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
        //             if(!$('#section8 .slide-wrap').is(':animated')){
        //                 prevCount();
        //             }               
        //         }

        //         mouseDown = false; // 드래그 앤 드롭 종료를 알려준다.                   
        //     },
        //     touchmove: function(e){   // 손가락 이벤트 터치 무브 === mousemove
        //         e.preventDefault();
        //         // if(!mouseDown === false){
        //         if(mouseDown === false){
        //             return;  // 마우스 다운 상태가 아니면 리턴(탈출)
        //         }
        //         dragEnd = e.originalEvent.changedTouches[0].clientX;
        //         // 실제 드래그 상태 스타일 애니메이션
        //         // 반드시 마우스가 다운 상태에서 드래그가 이루어지게 한다.
        //         $('#section8 .slide-wrap').css({left: dragEnd - dragStart});
        //     }
        // });
        // }      
    };

    obj.init();

    
    // obj.header();
    // obj.section1();
    // obj.section2();

    // Object 객체
    // 객체는 구성요소가 속성(프로퍼티스 Properties)과 메소드(=> 프로퍼티스 + function(){})
    // let obj2 = {
    //     init: function(){
    //         console.log(this.a);
    //         console.log(this.b);
    //         this.c();
    //         this.d();
    //     },
    //     a: 100,
    //     b: 300,
    //     c: function(){
    //         console.log(this.a + this.b);
    //     },
    //     d: function(){
    //         this.c();
    //     }
    // }
    // obj2.a;
    // obj2.b;
    // obj2.c();
    // obj2.d();
    // obj2.init();

})(jQuery);