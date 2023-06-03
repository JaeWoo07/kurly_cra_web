import React from 'react';
import {Link} from 'react-router-dom';

function UserGuide(){
    return (
        <main id="sub" className="UserGuide">
            <section id="UserGuide">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>이용안내</h2>
                        </div>
                        <div className="content">
                            <div className="box">
                                <div className="box-row1">
                                    <div className="box-wrapper1">
                                        <div className="box1">
                                            <div className="box-content-wrapper1">
                                                <div className="box-title">
                                                    <h3>회원 / 혜택</h3>
                                                    <img src="./img/user_guide/user.png" alt="" />
                                                </div>
                                                <div className="box-content">
                                                    <p>
                                                        컬리에 회원가입을 하시면<br/>
                                                        가입 즉시 게시판 이용 및 각종 할인 쿠폰과<br/>
                                                        적립금, 이벤트 혜택을 받으실 수 있습니다.<br/>
                                                        쿠폰과 적립금은 로그인 하신 후<br/>
                                                        마이페이지에서 확인하실 수 있습니다.
                                                    </p>
                                                </div>
                                            </div>                                      
                                        </div>                                  
                                    </div>
                                    <div className="box-wrapper2">
                                        <div className="box2">
                                            <div className="box-content-wrapper2">
                                                <div className="box-title">
                                                    <h3>주문 / 결제</h3>
                                                    <img src="./img/user_guide/cart.png" alt="" />
                                                </div>
                                                <div className="box-content">
                                                    <p>상품 주문은</p><br/>
                                                    <span>                                               
                                                        장바구니에 상품 담기<img src="./img/user_guide/ico_arrow_x2.webp" alt="" />
                                                        회원 혹은 비회원 주문<img src="./img/user_guide/ico_arrow_x2.webp" alt="" /><br/>
                                                        주문서 작성<img src="./img/user_guide/ico_arrow_x2.webp" alt="" />
                                                        결제 방법 선택 및 결제<img src="./img/user_guide/ico_arrow_x2.webp" alt="" /><br/>
                                                        주문 완료
                                                    </span>
                                                    <p>로 이루어집니다.</p>
                                                    <p>
                                                        비회원 주문인 경우 주문번호를 메모해 두시기 바랍니다.
                                                    </p>
                                                </div>
                                            </div>                                      
                                        </div>                                  
                                    </div>
                                </div>
                                <div className="box-row2">
                                    <div className="box-wrapper3">
                                        <div className="box3">
                                            <div className="box-content-wrapper3">
                                                <div className="box-title">
                                                    <h3>배송</h3>
                                                    <img src="./img/user_guide/delivery.png" alt="" />
                                                </div>
                                                <div className="box-content">
                                                    <p>
                                                        컬리는 싱싱한 유기농 상품을<br/>
                                                        고객님의 식탁까지 빠르고 안전하게<br/>
                                                        배달하기 위해 항상 노력합니다.<br/>
                                                        특히 샛별배송을 받으시는 경우,<br/>
                                                        배송 요청사항란에 특수정보를 기입해주셔야<br/>
                                                        보다 안전한 배송이 가능합니다.
                                                    </p>
                                                </div>
                                            </div>                                      
                                        </div>                                  
                                    </div>
                                    <div className="box-wrapper4">
                                        <div className="box4">
                                            <div className="box-content-wrapper4">
                                                <div className="box-title">
                                                    <h3>취소 / 교환 / 환불</h3>
                                                    <img src="./img/user_guide/box.png" alt="" />
                                                </div>
                                                <div className="box-content">
                                                    <p>
                                                        주문취소는 배송 단계별로 방법이 상이합니다.<br/>
                                                        - [주문완료] 상태일 경우에만 주문 취소 가능합니<br/>다.<br/>
                                                        - [마이컬리 {'>'} 주문 내역 상세페이지]에서 직접<br/>
                                                        취소하실 수 있습니다.<br/>
                                                        받으신 상품의 이상이 있거나 궁금한 사항이<br/>
                                                        있다면 언제든지 1:1문의 게시판 에 문의해주세요.
                                                    </p>
                                                </div>
                                            </div>                                      
                                        </div>                                  
                                    </div>
                                </div>                                                                                                                      
                            </div>
                            <div className="comment">
                                <div className="right-box">
                                    <p>보다 상세한 이용안내가 필요하신가요?</p>
                                    <span><Link to="/자주하는질문">자주하는 질문</Link><img src="./img/user_guide/purple_arrow.svg" alt="" /></span>
                                </div>
                                <div className="left-box">
                                    <p>추가적인 문의 사항이 있으신가요?</p>
                                    <span><Link to="/1대1문의">1:1 문의</Link><img src="./img/user_guide/purple_arrow.svg" alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserGuide;