import React from 'react';
import axios from 'axios';
import $ from 'jquery';

function Sub2Component(){

    // 상태관리 변수: state(스테이트), setState()(셋스테이트, 세터)
    const [state, setState] = React.useState([]);

    const [state2, setState2] = React.useState([]);


    const getProduct=()=>{
        // method: 폼데이터 전송 응답 => post
        // method: 데이터만 가져오기 => get
        // axios({url:'', method:''}).then(()=>{성공메세지}).catch(()=>{실패 메세지});
        axios({
            url: './data/best_product.json',
            method: 'GET'
        })
        .then((res)=>{
            // console.log('AXIOS 성공!', res);
            setState(res.data.베스트);
        })
        .catch((err)=>{
            // console.log('AXIOS 실패!', err);
        });
    };

    const commaFormat=(z)=>{
        let str = z.toString();
        const regExp = /(^\d+)(\d{3})/;

        while(regExp.test(str)){
            str = str.replace(regExp, '$1,$2');
        }

        return str;
    };


    
    // 모달
    let isModal = false;
    let isModal2 = false;

    const onClickCategoryBtn=(e)=>{
        e.preventDefault();
        isModal = true;

        setState2({
            ...state2,
            isModal: isModal
        })
    }

    const onClickModalClose=(e)=>{
        e.preventDefault();
        setState2({
            ...state2,
            isModal: false,
            isModal2: false
        });
    }

    const onClickBrandBtn=(e)=>{
        e.preventDefault();
        isModal2 = true;

        setState2({
            ...state2,
            isModal2: isModal2
        })
    }



    // 리액트는 함수 실행을 훅이 담당한다. 화면이 다 그려지고 난 후 실행
    React.useEffect(()=>{
        getProduct();
    }, []);  // , []: 로딩 시 1회만 실행



    React.useEffect(()=>{
        const $categoryBtn = $('#section2 .category-btn');
            
            // 토글버튼 슬라이드
            $categoryBtn.on({
                click: function(e){
                    e.preventDefault();
                    $(this).next().stop().slideToggle(200); // slideUp과 slideDown

                    $(this).find('svg').stop().toggleClass('on');
                }
            });
    }, []);


    return (
        <>
        <main id="sub" className="sub2">
            <section id="section1">
                <div className="container">
                    <div className="gap">
                        <div className="title hide">
                            <h2>이 주의 신상 랭킹</h2>            
                        </div>
                        <div className="container">
                            {/* <a href="!#" onClick={e => e.preventDefault()}><img src="./img/sub2/sNzW2Z2kJPIMWnOvw29EpKDlQxcSvWrvoSHwNnw4.png" alt=""/></a> */}
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>베스트</h2>
                        </div>
                        <div className="content">
                            <div className="left">
                                <div className="left-header">
                                    <span>필터</span>
                                    <a href="!#" onClick={e => e.preventDefault()}><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path><path d="M14.4933 1L14.4933 4.52H10.9733" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path></svg> <span>초기화</span></a>
                                </div>
                                <div className="left-content">
                                    <form id="filterForm" name="filter_form">
                                        <ul>
                                            <li>
                                                <a href="!#" onClick={e => e.preventDefault()} className="category-btn" title="카테고리"><span>카테고리</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className="sub sub1">
                                                    <ul>
                                                        <li><label htmlFor="sub1Chk01"><input type="checkbox" id="sub1Chk01" name="sub1_chk_01" value="과일·견과·쌀"/>과일·견과·쌀</label></li>
                                                        <li><label htmlFor="sub1Chk02"><input type="checkbox" id="sub1Chk02" name="sub1_chk_02" value="국·반찬·메인요리"/>국·반찬·메인요리</label></li>
                                                        <li><label htmlFor="sub1Chk03"><input type="checkbox" id="sub1Chk03" name="sub1_chk_03" value="면·양념·오일"/>면·양념·오일</label></li>
                                                        <li><label htmlFor="sub1Chk04"><input type="checkbox" id="sub1Chk04" name="sub1_chk_04" value="생활용품·리빙·캠핑"/>생활용품·리빙·캠핑</label></li>
                                                        <li><label htmlFor="sub1Chk05"><input type="checkbox" id="sub1Chk05" name="sub1_chk_05" value="샐러드·간편식"/>샐러드·간편식</label></li>
                                                        <li><label htmlFor="sub1Chk06"><input type="checkbox" id="sub1Chk06" name="sub1_chk_06" value="수산·해산·건어물"/>수산·해산·건어물</label></li>
                                                        <li><label htmlFor="sub1Chk07"><input type="checkbox" id="sub1Chk07" name="sub1_chk_07" value="정육·계란"/>정육·계란</label></li>
                                                        <li><label htmlFor="sub1Chk08"><input type="checkbox" id="sub1Chk08" name="sub1_chk_08" value="간식·과자·떡"/>간식·과자·떡</label></li>
                                                        <li><label htmlFor="sub1Chk09"><input type="checkbox" id="sub1Chk09" name="sub1_chk_09" value="생수·음료·우유·커피"/>생수·음료·우유·커피</label></li>
                                                        <li><label htmlFor="sub1Chk10"><input type="checkbox" id="sub1Chk10" name="sub1_chk_10" value="건강식품"/>건강식품</label></li>
                                                    </ul>
                                                    <span><button 
                                                        className="category-more-view-btn"
                                                        onClick={onClickCategoryBtn}
                                                        >카테고리 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></span>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="!#" onClick={e => e.preventDefault()} className="category-btn" title="브랜드"><span>브랜드</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className="sub sub2">
                                                    <span className="sub1-brand-span1"><button onClick={e => e.preventDefault()}>가나다 순</button><i>|</i><button onClick={e => e.preventDefault()}>상품많은 순</button></span>
                                                    <ul>
                                                        <li><label htmlFor="sub2Chk01"><input type="checkbox" id="sub2Chk01" name="sub2_chk_01" value="더반찬"/>더반찬</label></li>
                                                        <li><label htmlFor="sub2Chk02"><input type="checkbox" id="sub2Chk02" name="sub2_chk_02" value="디어스킨"/>디어스킨</label></li>
                                                        <li><label htmlFor="sub2Chk03"><input type="checkbox" id="sub2Chk03" name="sub2_chk_03" value="마마포레스트"/>마마포레스트</label></li>
                                                        <li><label htmlFor="sub2Chk04"><input type="checkbox" id="sub2Chk04" name="sub2_chk_04" value="메종콜리브리"/>메종콜리브리</label></li>
                                                        <li><label htmlFor="sub2Chk05"><input type="checkbox" id="sub2Chk05" name="sub2_chk_05" value="부보"/>부보</label></li>
                                                        <li><label htmlFor="sub2Chk06"><input type="checkbox" id="sub2Chk06" name="sub2_chk_06" value="샐러드판다"/>샐러드판다</label></li>
                                                        <li><label htmlFor="sub2Chk07"><input type="checkbox" id="sub2Chk07" name="sub2_chk_07" value="에코버"/>에코버</label></li>
                                                        <li><label htmlFor="sub2Chk08"><input type="checkbox" id="sub2Chk08" name="sub2_chk_08" value="타르틴베이커리"/>타르틴베이커리</label></li>
                                                        <li><label htmlFor="sub2Chk09"><input type="checkbox" id="sub2Chk09" name="sub2_chk_09" value="풀무원"/>풀무원</label></li>
                                                        <li><label htmlFor="sub2Chk10"><input type="checkbox" id="sub2Chk10" name="sub2_chk_10" value="퓨어스펙"/>퓨어스펙</label></li>
                                                    </ul>
                                                    <span><button 
                                                        className="brand-more-view-btn"
                                                        onClick={onClickBrandBtn}
                                                        >브랜드 더보기<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button></span>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="!#" onClick={e => e.preventDefault()} className="category-btn" title="가격"><span>가격</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className="sub sub3">
                                                    <ul>
                                                        <li><label htmlFor="sub3Chk01"><input type="checkbox" id="sub3Chk01" name="sub3_chk_01" value="6,000원 미만"/>6,000원 미만</label></li>
                                                        <li><label htmlFor="sub3Chk02"><input type="checkbox" id="sub3Chk02" name="sub3_chk_02" value="6,000원~10,800원"/>6,000원~10,800원</label></li>
                                                        <li><label htmlFor="sub3Chk03"><input type="checkbox" id="sub3Chk03" name="sub3_chk_03" value="10,800원~16,150원"/>10,800원~16,150원</label></li>
                                                        <li><label htmlFor="sub3Chk04"><input type="checkbox" id="sub3Chk04" name="sub3_chk_04" value="16,150원 이상"/>16,150원 이상</label></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="!#" onClick={e => e.preventDefault()} className="category-btn" title="혜택"><span>혜택</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className="sub sub4">
                                                    <ul>
                                                        <li><label htmlFor="sub4Chk01"><input type="checkbox" id="sub4Chk01" name="sub4_chk_01" value="할인상품"/>할인상품</label></li>
                                                        <li><label htmlFor="sub4Chk02"><input type="checkbox" id="sub4Chk02" name="sub4_chk_02" value="한정수량"/>한정수량</label></li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="!#" onClick={e => e.preventDefault()} className="category-btn" title="유형"><span>유형</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                                <div className="sub sub5">
                                                    <ul>
                                                        <li><label htmlFor="sub5Chk01"><input type="checkbox" id="sub5Chk01" name="sub5_chk_01" value="Kurly Only"/>Kurly Only</label></li>
                                                        <li><label htmlFor="sub5Chk02"><input type="checkbox" id="sub5Chk02" name="sub5_chk_02" value="희소가치 프로젝트"/>희소가치 프로젝트</label></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                            <div className="right">
                                <div className="right-header">
                                    <span>총 163건</span>
                                    <span>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn on" title="추천순">추천순 <svg width="14" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.9932 0.700195C8.73506 0.700195 10.3116 1.40557 11.4528 2.54565C12.5943 3.68594 13.3002 5.26111 13.3002 7.0002C13.3002 8.73928 12.5943 10.3145 11.4528 11.4547C10.3116 12.5948 8.73506 13.3002 6.9932 13.3002C5.25512 13.3002 3.68233 12.595 2.54387 11.4554C1.40457 10.315 0.700195 8.73952 0.700195 7.0002C0.700195 5.26087 1.40457 3.68541 2.54387 2.54497C3.68233 1.40537 5.25512 0.700195 6.9932 0.700195Z" stroke="#ccc" strokeWidth="1.4"></path><path d="M4.5 5.21081H5.77027C5.81351 4.55135 6.26216 4.12973 6.95946 4.12973C7.64054 4.12973 8.09459 4.53514 8.09459 5.0973C8.09459 5.58784 7.90383 5.86944 7.35576 6.22524L7.1973 6.32432C6.45135 6.76216 6.13784 7.24865 6.18649 8.05946L6.19189 8.42703H7.44595V8.11892C7.44595 7.58378 7.64595 7.30811 8.35405 6.89189C9.08919 6.45405 9.5 5.87568 9.5 5.04865C9.5 3.85405 8.51081 3 7.02973 3C5.42432 3 4.54324 3.92973 4.5 5.21081ZM6.87838 11.0054C6.33784 11.0054 5.98108 10.6649 5.98108 10.1459C5.98108 9.62162 6.33784 9.28108 6.87838 9.28108C7.42973 9.28108 7.77568 9.62162 7.77568 10.1459C7.77568 10.6649 7.42973 11.0054 6.87838 11.0054Z" fill="#ccc"></path></svg></a> <i>|</i>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn" title="신상품순">신상품순</a> <i>|</i>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn" title="판매량순">판매량순</a> <i>|</i>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn" title="혜택순">혜택순</a> <i>|</i>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn" title="낮은 가격순">낮은 가격순</a> <i>|</i>
                                        <a href="!#" onClick={e => e.preventDefault()} className="order-btn" title="높은 가격순">높은 가격순</a>
                                    </span>
                                </div>
                                <div className="right-content">
                                    <ul className="new-product">

                                        {/* <!-- AJAX API 구현 --> */}

                                        {/* 가상태그를 만들고 프롭스를 전달하고 바인딩이 된다. */}
                                        {/* 신상품 컴포넌트 */}
                                        {
                                            state.map((item, idx)=>{
                                                return(
                                                    <li key={idx}>
                                                        <div className="col-gap">
                                                            <a href="!#" onClick={e => e.preventDefault()}>
                                                                <div className="img-box">
                                                                    <img src={`./img/sub2/${item.상품이미지}`} alt=""/>
                                                                    <span><img src={`./img/sub2/${item.카트아이콘}`} alt=""/></span>
                                                                </div>
                                                                <div className="txt-box">
                                                                    <h2>{item.배송}</h2>
                                                                    <h2>[{item.제조사}] {item.상품명}</h2>
                                                                    <h5>{item.상품정보}</h5>
                                                                    <h3>
                                                                        {item.할인율 > 0 ? <strong>{Math.round(item.할인율 * 100)}%</strong> : ``}
                                                                        <em>{commaFormat(Math.round(item.정가 * (1 - item.할인율)))}원</em>
                                                                    </h3>
                                                                    {item.할인율 > 0 ? <h4><s>{commaFormat(item.정가)}원</s></h4> : ``}
                                                                    {item.후기 !== "" ? <h5><span className= "sub2-review">후기 {item.후기}</span></h5> : ``}
                                                                    {item.판매처 !== "" ? <h4 className= "sub2-kurlyonly">{item.판매처}</h4> : ``}
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>         
        </main>

        {
        state2.isModal && (
        <div className="sub2-modal1">
                <div className="container">
                    <div className="content">
                        <div className="title">
                            <h2>카테고리</h2>
                        </div>
                        <ul>
                            <li><label htmlFor="sub2Modal-01"><input type="checkbox" id="sub2Modal-01" name="sub2_modal_01" value="과일·견과·쌀"/>과일·견과·쌀</label></li>
                            <li><label htmlFor="sub2Modal-02"><input type="checkbox" id="sub2Modal-02" name="sub2_modal_02" value="국·반찬·메인요리"/>국·반찬·메인요리</label></li>
                            <li><label htmlFor="sub2Modal-03"><input type="checkbox" id="sub2Modal-03" name="sub2_modal_03" value="면·양념·오일"/>면·양념·오일</label></li>
                            <li><label htmlFor="sub2Modal-04"><input type="checkbox" id="sub2Modal-04" name="sub2_modal_04" value="생활용품·리빙·캠핑"/>생활용품·리빙·캠핑</label></li>
                            <li><label htmlFor="sub2Modal-05"><input type="checkbox" id="sub2Modal-05" name="sub2_modal_05" value="샐러드·간편식"/>샐러드·간편식</label></li>
                            <li><label htmlFor="sub2Modal-06"><input type="checkbox" id="sub2Modal-06" name="sub2_modal_06" value="수산·해산·건어물"/>수산·해산·건어물</label></li>
                            <li><label htmlFor="sub2Modal-07"><input type="checkbox" id="sub2Modal-07" name="sub2_modal_07" value="정육·계란"/>정육·계란</label></li>
                            <li><label htmlFor="sub2Modal-08"><input type="checkbox" id="sub2Modal-08" name="sub2_modal_08" value="간식·과자·떡"/>간식·과자·떡</label></li>
                            <li><label htmlFor="sub2Modal-09"><input type="checkbox" id="sub2Modal-09" name="sub2_modal_09" value="생수·음료·우유·커피"/>생수·음료·우유·커피</label></li>
                            <li><label htmlFor="sub2Modal-10"><input type="checkbox" id="sub2Modal-10" name="sub2_modal_10" value="건강식품"/>건강식품</label></li>
                        </ul>
                        <div className="button-box">
                            <button className="format-btn"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path><path d="M14.4933 1L14.4933 4.52H10.9733" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path></svg>초기화</button>
                            <button className="ok-btn">확인</button>
                        </div>
                        <button 
                            className="modal1-close-btn" 
                            title="모달 닫기"
                            onClick={onClickModalClose}
                            ><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2073_60924)"><path d="M26 26L6 6" stroke="#999" strokeLinecap="round" strokeWidth="0"></path><path d="M6 26L26 6" stroke="#999" strokeLinecap="round" strokeWidth="0"></path></g><path fillRule="evenodd" clipRule="evenodd" d="M6.28431 5.58859L6.35355 5.64645L16 15.293L25.6464 5.64645C25.8417 5.45118 26.1583 5.45118 26.3536 5.64645C26.5271 5.82001 26.5464 6.08944 26.4114 6.28431L26.3536 6.35355L16.707 16L26.3536 25.6464C26.5488 25.8417 26.5488 26.1583 26.3536 26.3536C26.18 26.5271 25.9106 26.5464 25.7157 26.4114L25.6464 26.3536L16 16.707L6.35355 26.3536C6.15829 26.5488 5.84171 26.5488 5.64645 26.3536C5.47288 26.18 5.4536 25.9106 5.58859 25.7157L5.64645 25.6464L15.293 16L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645C5.82001 5.47288 6.08944 5.4536 6.28431 5.58859Z" fill="#999"></path></svg></button>       
                    </div>
                </div>
            </div>           
        )
        }

        {
            state2.isModal2 && (
            <div className="sub2-modal2">
                <div className="container">
                    <div className="content">
                        <div className="title">
                            <h2>브랜드</h2><a href="!#" className="on" onClick={e => e.preventDefault()}>가나다 순</a><i>|</i><a href="!#" onClick={e => e.preventDefault()}>상품많은 순</a>
                        </div>
                        <ul>
                            <li><label htmlFor="sub2Modal2-01"><input type="checkbox" id="sub2Modal2-01" name="sub2_modal2_01" value="더반찬"/>더반찬</label></li>
                            <li><label htmlFor="sub2Modal2-02"><input type="checkbox" id="sub2Modal2-02" name="sub2_modal2_02" value="디어스킨"/>디어스킨</label></li>
                            <li><label htmlFor="sub2Modal2-03"><input type="checkbox" id="sub2Modal2-03" name="sub2_modal2_03" value="마마포레스트"/>마마포레스트</label></li>
                            <li><label htmlFor="sub2Modal2-04"><input type="checkbox" id="sub2Modal2-04" name="sub2_modal2_04" value="메종콜리브리"/>메종콜리브리</label></li>
                            <li><label htmlFor="sub2Modal2-05"><input type="checkbox" id="sub2Modal2-05" name="sub2_modal2_05" value="부보"/>부보</label></li>
                            <li><label htmlFor="sub2Modal2-06"><input type="checkbox" id="sub2Modal2-06" name="sub2_modal2_06" value="샐러드판다"/>샐러드판다</label></li>
                            <li><label htmlFor="sub2Modal2-07"><input type="checkbox" id="sub2Modal2-07" name="sub2_modal2_07" value="에코버"/>에코버</label></li>
                            <li><label htmlFor="sub2Modal2-08"><input type="checkbox" id="sub2Modal2-08" name="sub2_modal2_08" value="타르틴베이커리"/>타르틴베이커리</label></li>
                            <li><label htmlFor="sub2Modal2-09"><input type="checkbox" id="sub2Modal2-09" name="sub2_modal2_09" value="풀무원"/>풀무원</label></li>
                            <li><label htmlFor="sub2Modal2-10"><input type="checkbox" id="sub2Modal2-10" name="sub2_modal2_10" value="퓨어스펙"/>퓨어스펙</label></li>
                        </ul>
                        <div className="button-box">
                            <button className="format-btn"><svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.78 3.96303C12.504 2.16973 10.4086 1 8.04 1C4.15192 1 1 4.15192 1 8.04C1 11.9281 4.15192 15.08 8.04 15.08C11.9281 15.08 15.08 11.9281 15.08 8.04" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path><path d="M14.4933 1L14.4933 4.52H10.9733" stroke="#ddd" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="round"></path></svg>초기화</button>
                            <button className="ok-btn">확인</button>
                        </div>
                        <button 
                            className="modal2-close-btn" 
                            title="모달 닫기"
                            onClick={onClickModalClose}
                            ><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2073_60924)"><path d="M26 26L6 6" stroke="#999" strokeLinecap="round" strokeWidth="0"></path><path d="M6 26L26 6" stroke="#999" strokeLinecap="round" strokeWidth="0"></path></g><path fillRule="evenodd" clipRule="evenodd" d="M6.28431 5.58859L6.35355 5.64645L16 15.293L25.6464 5.64645C25.8417 5.45118 26.1583 5.45118 26.3536 5.64645C26.5271 5.82001 26.5464 6.08944 26.4114 6.28431L26.3536 6.35355L16.707 16L26.3536 25.6464C26.5488 25.8417 26.5488 26.1583 26.3536 26.3536C26.18 26.5271 25.9106 26.5464 25.7157 26.4114L25.6464 26.3536L16 16.707L6.35355 26.3536C6.15829 26.5488 5.84171 26.5488 5.64645 26.3536C5.47288 26.18 5.4536 25.9106 5.58859 25.7157L5.64645 25.6464L15.293 16L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645C5.82001 5.47288 6.08944 5.4536 6.28431 5.58859Z" fill="#999"></path></svg></button>                    
                    </div>
                </div>
            </div>
            )
        }
        </>
    );
};

export default Sub2Component;