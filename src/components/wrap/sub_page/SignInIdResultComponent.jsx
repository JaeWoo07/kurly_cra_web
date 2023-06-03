import React from 'react';
import { Link } from 'react-router-dom';

function SignInIdResultComponent(){

    const [state,setState] = React.useState({
        아이디: '',
        가입일자: '',
    });



    React.useEffect(()=>{

        let key = 'KURLY_ID_SEARCH';

        if(sessionStorage.getItem(key) !== null){
            const result = JSON.parse(sessionStorage.getItem(key));
            setState({
                ...state,
                아이디: result.아이디,
                가입일자: result.가입일자
            });
        }

    }, [state.아이디]);



    const onClickLogIn=(e)=>{
        e.preventDefault();

        window.location.href = '/로그인';
    }



    return (
        <main id="sub" className="sign-in-id-result">

            <section id="signInIdResult">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>고객님의 컬리 계정을 찾았습니다.</h2><br/>
                            <h4>아이디 확인 후 로그인해 주세요.</h4>
                        </div>
                        <div className="content">
                            <ul>
                                <li>                                  
                                    <div>
                                        <span>
                                            <img src="./img/sign_in/icon_id.svg" alt="" />
                                        </span>
                                        <span>                                           
                                            <strong>{state.아이디}</strong>
                                            <em>가입일 : {state.가입일자}</em>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/비밀번호찾기" title='비밀번호찾기'>비밀번호 찾기</Link>  
                                </li>
                                <li>        
                                    <button onClick={onClickLogIn} type='submit' title='로그인'>로그인</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

export default SignInIdResultComponent