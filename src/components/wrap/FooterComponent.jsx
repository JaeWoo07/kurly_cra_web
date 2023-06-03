import React from 'react';
import { Link } from 'react-router-dom';


function FooterComponent(){
    return(
        <footer id="footer">
            <div className="row1">
                <div className="container">
                    <div className="row1-1">
                        <div className="left">
                            <h1>고객행복센터</h1>
                            <h2><a href="tel:1644-1107" onClick={e => e.preventDefault()}>1644-1107</a><em>월~토요일 오전 7시 - 오후 6시</em></h2>
                            <ul>
                                <li>
                                    <a href="!#" onClick={e => e.preventDefault()}>카카오톡 문의</a>
                                    <span>
                                        월~토요일 <i>|</i> 오전 7시 - 오후 6시<br/>
                                        일/공휴일 <i>|</i> 오전 7시 - 오후 1시
                                    </span>
                                </li>
                                <li>
                                    <a href="!#" onClick={e => e.preventDefault()}>1:1 문의</a>
                                    <span>
                                        365일<br/>
                                        고객센터 운영시간에 순차적으로 답변드리겠습니다.
                                    </span>
                                </li>
                                <li>
                                    <a href="!#" onClick={e => e.preventDefault()}>대량주문 문의</a>
                                    <span>
                                        월~금요일 <i>|</i> 오전 9시 - 오후 6시<br/>
                                        점심시간 <i>|</i> 낮 12시 - 오후 1시
                                    </span>
                                </li>
                            </ul>
                            <div className="nonmember">
                                비회원 문의 : <a href="mailto:help@kurlycorp.com">help@kurlycorp.com</a><br/>
                                비회원 대량주문 문의 : <a href="mailto:kurlygift@kurlycorp.com">kurlygift@kurlycorp.com</a>
                            </div>
                        </div>
                        <div className="right">
                            <p>
                                <Link to="/컬리소개" title="컬리소개">컬리소개</Link>
                                <Link to="https://www.youtube.com/embed/WEep7BcboMQ?rel=0&showinfo=0&wmode=opaque&enablejsapi=1" target="_blank" title="컬리소개영상">컬리소개영상</Link>
                                <Link to="https://ir.kurly.com/" target="_blank" title="투자정보">투자정보</Link>
                                <Link to="https://kurly.career.greetinghr.com/" target="_blank" title="인재채용">인재채용</Link>
                                <Link to="/이용약관" title="이용약관">이용약관</Link>
                                <Link to="/개인정보처리방침" title="개인정보처리방침">개인정보처리방침</Link>
                                <Link to="/이용안내" title="이용안내">이용안내</Link>
                            </p>
                            <div className="footer-text-box">
                                <address>
                                    법인명 (상호) : 주식회사 컬리 <i>|</i> 사업자등록번호 : 261-81-23567 <a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=" target="_blank">사업자정보 확인</a><br/>
                                    통신판매업 : 제 2018-서울강남-01646 호 <i>|</i> 개인정보보호책임자 : 이원준<br/>
                                    주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) <i>|</i> 대표이사 : 김슬아<br/>
                                    입점문의 : <a href="mailto:dolsuk1995@naver.com">입점문의하기</a> <i>|</i> 제휴문의 : <a href="mailto:dolsuk1995@naver.com">business@kurlycorp.com</a><br/>
                                    채용문의 : <a href="mailto:dolsuk1995@naver.com">recruit@kurlycorp.com</a><br/>
                                    팩스 : 070 - 7500 - 6098
                                </address>              
                            </div>
                            <span>
                                <a href="https://www.instagram.com/marketkurly/" target="_blank" title="instagram"><img src="./img/ico_instagram.png" alt=""/></a>
                                <a href="https://www.facebook.com/Marketkurly/" target="_blank" title="facebook"><img src="./img/ico_fb.png" alt=""/></a>
                                <a href="https://blog.naver.com/marketkurly" target="_blank" title="blog"><img src="./img/ico_blog.png" alt=""/></a>
                                <a href="https://m.post.naver.com/marketkurly" target="_blank" title="naverpost"><img src="./img/ico_naverpost.png" alt=""/></a>
                                <a href="https://www.youtube.com/channel/UCfpdjL5pl-1qKT7Xp4UQzQg" target="_blank" title="youtube"><img src="./img/ico_youtube.png" alt=""/></a>
                            </span>       
                        </div>
                    </div>
                    <div className="row1-2">
                        <a href="!#" onClick={e => e.preventDefault()}>
                            <img src="./img/logo_isms.svg" alt=""/>
                            <span>
                                [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br/>
                                (심사받지 않은 물리적 인프라 제외)<br/>
                                [유효기간] 2022.01.19 ~ 2025.01.18
                            </span>
                        </a>
                        <a href="!#" onClick={e => e.preventDefault()}>
                            <img src="./img/logo_privacy.svg" alt=""/>
                            <span>
                                개인정보보호 우수 웹사이트 ·<br/>
                                개인정보처리시스템 인증 (ePRIVACY PLUS)
                            </span>
                        </a>
                        <a href="!#" onClick={e => e.preventDefault()}>
                            <img src="./img/logo_tosspayments.svg" alt=""/>
                            <span>
                                토스페이먼츠 구매안전(에스크로)<br/>
                                서비스를 이용하실 수 있습니다.
                            </span>
                        </a>
                        <a href="!#" onClick={e => e.preventDefault()}>
                            <img src="./img/logo_wooriBank.svg" alt=""/>
                            <span>
                                고객님이 현금으로 결제한 금액에 대해 우리은행과<br/>
                                채무지급보증 계약을 체결하여 안전거래를 보장하고<br/>
                                있습니다.
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="container">
                    <strong>
                        컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br/>
                        마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
                    </strong>
                    <em>© KURLY CORP. ALL RIGHTS RESERVED</em>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;