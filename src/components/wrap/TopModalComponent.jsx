import React from 'react';

function TopModalComponent({modalClose}){

    const onClickModalClose=(e)=>{
        e.preventDefault();

        modalClose(); // 상위 컴포넌트 모달창 닫기 함수 실행

        // 닫을 때 시점으로 1일간 열리지 않음.
        // 쿠키(Cookies) 설정 날짜 + 1
        let newDate = new Date();
        newDate.setDate(newDate.getDate() + 1); // 오늘 날짜 + 1일  
        // 쿠키에 저장하기
        // document.cookie = `;;;`;   // `쿠키이름 = 쿠키값(암호같이 사용); path=/; 만료일 = 세팅 날짜(국제표준시간설정).toUTCString();`
        // 모달창 닫기 누르면 쿠키 설정
        document.cookie = `TOPMODAL = kurly_top_modal; path =/; expires = ${newDate.toUTCString()};`;

    }


    return(
        <div id="topModal">
            <div className="container">
                <h2><a href="!#" onClick={e => e.preventDefault()} title="지금 가입하고 인기상품 100원에 받아가세요!">지금 가입하고 인기상품&nbsp;<strong>100원</strong>에 받아가세요!</a></h2>
                <a href="!#" onClick={onClickModalClose} title="탑모달 닫기" className="top-modal-close-btn"><img src="./img/ico_close_fff_84x84.png" alt=""/></a>
            </div>
        </div>
    );
};

export default TopModalComponent;