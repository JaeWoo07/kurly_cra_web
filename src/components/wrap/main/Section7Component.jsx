import React from 'react';
import $ from 'jquery';

function Section7Component(){

    React.useEffect(()=>{

            // 섹션7 슬라이드 ////////////////////////////////////////////////////////////////
            let n = $('#section7 .slide').length / 4 - 1;  // 슬라이드 전체 갯수  2 = 8 / 4 (한 화면의 개수)
            // 1. 메인 슬라이드 함수
            let cnt = 0;
            // $('#section2 .prev-btn').hide();  // 처음에는 이전 버튼 안보이게.
            mainSlide(); // 로딩 시 실행

            function mainSlide(){
                $('#section7 .slide-wrap').stop().animate({left: `${-100 * cnt}%`}, 300);

                // 화살버튼 보이기, 숨기기
                if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
                    $('#section7 .next-btn').hide();
                }
                else{  // 마지막이 아니면 버튼을 보인다.
                    $('#section7 .next-btn').show();
                };


                if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
                    $('#section7 .prev-btn').hide();
                }
                else{  // 처음이 아니면 버튼을 보인다.
                    $('#section7 .prev-btn').show();
                }
            };

            // 2-1. 다음 카운트 함수
            function nextCount(){
                cnt++;
                // $('#section2 .prev-btn').show();  // 이전 버튼 초기화
                // if(cnt >= 4){  // 마지막 위치이면 버튼을 숨긴다.
                //     $('#section2 .next-btn').hide();
                // }
                // else{  // 마지막이 아니면 버튼을 보인다.
                //     $('#section2 .next-btn').show();
                // };
                if(cnt > n){
                    cnt = n;
                };
                mainSlide();
            };

            // 2-2. 이전 카운트 함수
            function prevCount(){
                cnt--;
                // $('#section2 .next-btn').show(); // 다음 버튼 초기화
                // if(cnt <= 0){  // 처음 위치이면 버튼을 숨긴다.
                //     $('#section2 .prev-btn').hide();
                // }
                // else{  // 처음이 아니면 버튼을 보인다.
                //     $('#section2 .prev-btn').show();
                // };
                if(cnt < 0){
                    cnt = 0;
                };
                mainSlide();
            };

            // 3-1. 다음 화살버튼 클릭 이벤트
            $('#section7 .next-btn').on({
                click: function(e){
                    e.preventDefault();
                        nextCount();
                }
            });

            // 3-2. 이전 화살버튼 클릭 이벤트
            $('#section7 .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                        prevCount();
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
            let conW = $('#section7 .slide-container').innerWidth();
    
           $('#section7 .slide-container').on({
                mousedown: function(e){
                    e.preventDefault();
                    winW = $(window).innerWidth();
                    touchStart = e.clientX;
                    // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
                    dragStart = e.clientX - $('#section7 .slide-wrap').offset().left + ((winW - conW) / 2);
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
                        if(!$('#section7 .slide-wrap').is(':animated')){
                            nextCount();
                        }                      
                    }
                    if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                        if(!$('#section7 .slide-wrap').is(':animated')){
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
                       if(!$('#section7 .slide-wrap').is(':animated')){
                           nextCount();
                       }                      
                   }
                   if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                       if(!$('#section7 .slide-wrap').is(':animated')){
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
                    $('#section7 .slide-wrap').css({left: dragEnd - dragStart});
                }
            });

            // 새로고침 방지
           $('#section7 .slide-wrap').on({
            click: function(e){
                if(touchStart - touchEnd !== 0){
                    e.preventDefault();
                }
            }
           })


           // 모바일 반응형 (손가럭 터치이벤트) : 마우스이벤트 인식 안 됨
           // 터치 스와이프
           // 드래그 앤 드롭
           $('#section7 .slide-container').on({
            touchstart: function(e){   // 손가락 이벤트 터치 스타트 === mousedown
                e.preventDefault();

                // console.log('touchstart');
                // console.log(e);
                // console.log(e.originalEvent.changedTouches[0].clientX);
              
                winW = $(window).innerWidth();
                touchStart = e.originalEvent.changedTouches[0].clientX;
                // 슬라이드 박스 왼쪽 위치의 값을 계속 구한다.
                dragStart = e.originalEvent.changedTouches[0].clientX - $('#section7 .slide-wrap').offset().left + ((winW - conW) / 2);
                mouseDown = true; // 마우스 다운 드래그 시작
                // console.log('마우스 터치 스와이프 시작 ', e.clientX);  // 터치 시작 수평 좌표
            },
            touchend: function(e){    // 손가락 이벤트 터치 엔드 === mouseup
                e.preventDefault();
                touchEnd = e.originalEvent.changedTouches[0].clientX;
                // console.log('마우스 터치 스와이프 종료 ', e.clientX);  // 터치 종료 수평 좌표
                // console.log('터치시작 - 터치종료 ', touchStart - touchEnd)

                // 방향 결정
                if(touchStart - touchEnd > 0){  // 양수 => 다음 슬라이드
                    if(!$('#section7 .slide-wrap').is(':animated')){
                        nextCount();
                    }                      
                }
                if(touchStart - touchEnd < 0){  // 음수 => 이전 슬라이드
                    if(!$('#section7 .slide-wrap').is(':animated')){
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
                $('#section7 .slide-wrap').css({left: dragEnd - dragStart});
            }
        });

    }, []);

    return (
        <section id="section7" className="section-public">
            <div className="container">
                <div className="title">
                    <h2><a href="!#" onClick={e => e.preventDefault()}>놓치면 후회할 가격 {'>'}</a></h2>
                </div>                   
                <div className="slide-container">
                    <div className="slide-view">
                        <ul className="slide-wrap">
                            <li className="slide slide1">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1597973998491l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[하이포크] 칼집 꽃삼겹살 300g (냉장)</h2>
                                            <h3><em>8,500원</em></h3>
                                            <h5>후기<span>151</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide2">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1541572727557l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[면사랑] 오장동식 간재미회냉면 밀키트 (2인분)</h2>
                                            <h3><em>8,500원</em></h3>
                                            <h5>후기<span>37</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide3">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1548744197291l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[풀무원] 정통된장찌개양념 130g * 4개입</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>278</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide4">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1554256388619l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide5">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1554270168713l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide6">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1572324205916l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide7">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1572324571136l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide8">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1578624792518l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide9">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1582000123719l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide10">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1582093412107l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide11">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1583302373529l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide12">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1583486742693l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide13">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1584344351914l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide14">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1587346611469l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide15">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1590133780777l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide16">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1592556060428l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide17">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1593657144775l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide18">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1599037872541l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide19">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1600320922519l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="slide slide20">
                                <div className="slide-gap">
                                    <a href="!#" onClick={e => e.preventDefault()}>
                                        <div className="img-box">
                                            <img src="./img/1602660379442l0.jpg" alt=""/>
                                            <span><img src="./img/ico_cart_fill.svg" alt=""/></span>
                                        </div>
                                        <div className="txt-box">
                                            <h2>[자연실록] 무항생제 두마리 통닭 (600gX2입)</h2>
                                            <h3><strong>7%</strong><em>7,905원</em></h3>
                                            <h4><s>8,500원</s></h4>
                                            <h5>후기<span>999+</span></h5>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a href="!#" className="next-btn"><img src="./img/slide_arrow.svg" alt=""/></a>
                    <a href="!#" className="prev-btn"><img src="./img/slide_arrow.svg" alt=""/></a>
                </div>
            </div>
        </section>
    );
};

export default Section7Component;