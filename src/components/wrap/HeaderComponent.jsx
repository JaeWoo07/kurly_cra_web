import React from 'react';
import {Link, Outlet, NavLink} from 'react-router-dom';
import $ from 'jquery';

function HeaderComponent({login, logout}){

    const onClickSetIdClear=(e)=>{

        // 슬라이드 초기화
        if(sessionStorage.getItem('SETID') !== null){
            const setId = sessionStorage.getItem('SETID');
            clearInterval(setId);
        }
    };

    React.useEffect(()=>{

            // header: 속성 + function(){} => 메소드(함수)
            const headerRow3Top = $('#header .header-row3-1').offset().top;  // 142

            // console.log('섹션2 슬라이드컨테이너 탑값: ' + $('#section2 .slide-container').offset().top);

            // 스크롤 이벤트 발생하여 헤더 3행인 메인메뉴에 도달하면 헤더 영역 메뉴 고정(fixed)된다.
            // 윈도우 스크롤 이벤트 구현
            $(window).scroll(function(){
                // 스크롤이벤트 발생하면 현재 스크롤 탑값을 보여준다.
                // console.log($(window).scrollTop());
                // 헤더 영역의 3행 탑값 위치 찾기(맨 위에서 여기 까지의 간격)
                // console.log('헤더 로우3 탑값 위치: ' + $('#header .header-row3').offset().top);

                if($(window).scrollTop() >= headerRow3Top){
                    $('#header').addClass('on header-row3-1');  // 헤더에 on클래스를 추가한다.
                    $('#header').addClass('on header-row3-2');  // 헤더에 on클래스를 추가한다.
                    $('#header .header-row3-1').addClass('hide');
                    $('#header .header-row3-2').removeClass('hide');
                }
                else{
                    $('#header').removeClass('on header-row3-1');  // 헤더에 on클래스를 삭제한다.
                    $('#header').removeClass('on header-row3-2');  // 헤더에 on클래스를 삭제한다.
                    $('#header .header-row3-1').removeClass('hide');
                    $('#header .header-row3-2').addClass('hide');
                }
            });


            // 헤더 //////////////////////////////////////////////////////////////////////////////////
            // $('.custom-center-btn').mouseenter(function(){
            //     $('.custom-center').show();
            // });

            // $('#header .custom-center-btn').on('mouseenter', function(){
            //     $('#header .custom-center').show();
            // });
            
            $('#header .custom-center-btn').on({
                mouseenter: function(){
                    $('#header .custom-center').show();
                }
            });

        // 고객센터 li 마지막 칸 영역을 떠나면 툴팁메뉴 숨기기
            // $('.custom-center-li').mouseleave(function(){
            //     $('.custom-center').hide();
            // });

            // $('.custom-center-li').on('mouseleave', function(){
            //     $('custom-center').hide();
            // });

            $('#header .custom-center-li').on({
                mouseleave: function(){
                    $('#header .custom-center').hide();
                }
            });

            // 배송지 등록 버튼
            $('#header .map-btn').on({
                mouseenter: function(){
                    $('#header .map-tooltip').show();
                }
            });

            // 툴팁 메뉴를 떠나면 툴팁메뉴 숨기기
            $('#header .map-btn-li').on({
                mouseleave: function(){
                    $('#header .map-tooltip').hide();
                }
            });

    }, []);

    

    const onClickLogOut=(e)=>{
        e.preventDefault();

        try{
            localStorage.removeItem(login.key); // 로컬스토리지
            logout();  // 상태관리 삭제
            let newDate = new Date();
            newDate.setDate( newDate.getDate() - 4 );  // 로그인이 3일 - 4
            document.cookie = `${login.key}=; path=/; expires=${newDate.toUTCString()};`;

            window.location.reload();
            window.location.href = '/메인';
            
        }
        catch(e){
            console.log(e);
        }
       
    }



    const onClickGoToLogIn=(e)=>{
        e.preventDefault();

        window.location.href = '/로그인';
    }



    // 주소 검색 버튼 클릭 이벤트
    const onClickAddrSearchBtn=(e)=>{
        e.preventDefault();
        // 팝업창 크기: 530 * 569
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        const popWidth = 530;
        const popHeight = 569;
        const popTop = (winHeight - popHeight) / 2;
        const popLeft = (winWidth - popWidth) / 2;
        const popUrl = 'popup.html';
        const popName = 'addressSearch';

        window.open(popUrl, popName, `width = ${popWidth}, height = ${popHeight}, top = ${popTop}, left = ${popLeft}`);
    }




    return(
        <>
            <header id="header">
                <div className="header-row1">
                    <div className="container">
                        <aside id="aside">
                            <ul>
                                {/* <li><Link to="/회원가입" onClick={onClickSetIdClear} className="on">{login.name === '' ? '회원가입' : <span onClick={onClickLogOut}>로그아웃</span>}</Link></li> */}
                                <li><Link to="/회원가입" onClick={onClickSetIdClear} className={`on${login.name === "" ? '' : ' hide'}`}>회원가입</Link></li>
                                <li><Link to="/" onClick={onClickSetIdClear} className={`on${login.name === "" ? ' hide' : ''}`}><span onClick={onClickLogOut}>로그아웃</span></Link></li>
                                <li><i>|</i></li>
                                {/* <li><Link to="/로그인" onClick={onClickSetIdClear} >{login.name === '' ? '로그인' : login.name}</Link></li> */}
                                <li><Link to="/로그인" onClick={onClickSetIdClear} className={`${login.name === "" ? '' : ' hide'}`}>로그인</Link></li>
                                <li><Link to="/마이페이지" onClick={onClickSetIdClear} className={`${login.name === "" ? ' hide' : ''}`}>{login.name} 님</Link></li>
                                <li><i>|</i></li>
                                <li className="custom-center-li">
                                    <Link to="/공지사항" onClick={onClickSetIdClear}  className="custom-center-btn">고객센터<img src="./img/ico_down_16x10.png" alt=""/></Link>
                                    <div className="custom-center">
                                        <ul>
                                            <li><Link to="/공지사항" onClick={onClickSetIdClear} >공지사항</Link></li>
                                            <li><Link to="/자주하는질문" onClick={onClickSetIdClear} >자주하는 질문</Link></li>
                                            <li><Link to="/1대1문의" onClick={onClickSetIdClear} >1:1 문의</Link></li>
                                            <li><Link to="/대량주문문의" onClick={onClickSetIdClear} >대량주문 문의</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className="header-row2">
                    <div className="container">
                        <div className="left">
                            <Link to="/메인" onClick={onClickSetIdClear} title="홈"><img src="./img/ico_lkurly_logo.svg" alt=""/>마켓컬리</Link>
                            <i>|</i>  {/* <!-- <span><i>|</i></span> --> */}
                            <Link to="#" onClick={onClickSetIdClear} >뷰티컬리<img src="./img/ico_n.svg" alt=""/></Link>
                        </div>
                        <div className="center">
                            <input type="text" id="search" name="search" placeholder="검색어를 입력해 주세요"/>
                            <Link to="#" onClick={onClickSetIdClear} title="search"><img src="./img/ico_zoom.svg" alt=""/></Link>
                        </div>
                        <div className="right">
                            <ul>
                                <li className="map-btn-li">
                                    <Link to="#" onClick={onClickSetIdClear} className="map-btn"><img src="./img/ico_map.svg" alt=""/></Link>
                                    <div className="map-tooltip">
                                        <p className="text-box">
                                            <span>배송지를 등록</span>하고<br/>구매 가능한 상품을 확인하세요!
                                        </p>
                                    <div className="button-box">
                                        <button onClick={onClickGoToLogIn}>로그인</button>
                                        <button onClick={onClickAddrSearchBtn}><img src="./img/ico_zoom_white.png" alt=""/>주소 검색</button>
                                    </div>
                                    </div>
                                </li>
                                <li><Link to="#" onClick={onClickSetIdClear} ><img src="./img/ico_heart.svg" alt=""/></Link></li>                      
                                <li><Link to="#" onClick={onClickSetIdClear} ><img src="./img/ico_cart.svg" alt=""/></Link></li>  
                            </ul>                   
                        </div>
                    </div>
                </div>
                <div className="header-row3-1">
                    <div className="container">
                        <div className="left">
                            <span><Link to="#" onClick={onClickSetIdClear} title="카테고리"><img src="./img/ham_bar_black.svg" alt=""/><strong>카테고리</strong></Link></span>
                        </div>
                        <div className="center">
                            <nav id="nav">
                                <NavLink to="/신상품" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >신상품</NavLink>
                                <NavLink to="/베스트" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >베스트</NavLink>
                                <NavLink to="/알뜰쇼핑" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >알뜰쇼핑</NavLink>
                                <NavLink to="/특가혜택" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >특가/혜택</NavLink>
                            </nav>
                        </div>
                        <div className="right">
                            <Link to="/배송안내" onClick={onClickSetIdClear} ><span>샛별 ・ 택배</span>배송안내</Link>
                        </div>
                    </div>
                </div>
                <div className="header-row3-2 hide">
                    <div className="container">
                        <div className="left">
                            <span><Link to="#" onClick={onClickSetIdClear} title="카테고리"><img src="./img/ham_bar_black.svg" alt=""/><strong>카테고리</strong></Link></span>
                        </div>
                        <div className="center">
                            <nav id="nav">
                                <NavLink to="/신상품" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >신상품</NavLink>
                                <NavLink to="/베스트" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >베스트</NavLink>
                                <NavLink to="/알뜰쇼핑" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >알뜰쇼핑</NavLink>
                                <NavLink to="/특가혜택" className={({ isActive }) => (isActive ? "active" : "")} onClick={onClickSetIdClear} >특가/혜택</NavLink>
                                <input type="text" id="search" name="search" placeholder="검색어를 입력해 주세요"/>
                                <Link to="#" id="search-image" onClick={onClickSetIdClear} title="search"><img src="./img/ico_zoom_black.svg" alt=""/></Link>
                            </nav>                           
                        </div>                        
                        <div className="right">
                            <ul>
                                <li className="map-btn-li">
                                    <Link to="#" onClick={onClickSetIdClear} className="map-btn"><img src="./img/ico_map.svg" alt=""/></Link>
                                    <div className="map-tooltip">
                                        <p className="text-box">
                                            <span>배송지를 등록</span>하고<br/>구매 가능한 상품을 확인하세요!
                                        </p>
                                    <div className="button-box">
                                        <button onClick={onClickGoToLogIn}>로그인</button>
                                        <button onClick={onClickAddrSearchBtn}><img src="./img/ico_zoom_white.png" alt=""/>주소 검색</button>
                                    </div>
                                    </div> 
                                </li>                     
                                <li><Link to="#" onClick={onClickSetIdClear} ><img src="./img/ico_heart.svg" alt=""/></Link></li>                      
                                <li><Link to="#" onClick={onClickSetIdClear} ><img src="./img/ico_cart.svg" alt=""/></Link></li>  
                            </ul>                   
                        </div>
                    </div>
                </div>
            </header>            
            <Outlet/>
        </>
    );
}

export default HeaderComponent;