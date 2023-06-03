import React from 'react';
import axios from 'axios';

function Sub4Component(){
    
    // 제이쿼리 페이지 전환 시
    // 스크립트를 생성하여 제이쿼리를 다시 로딩시킨다.
    // const createElement=()=>{
    //     const scriptTag = document.createElement('script');
    //     scriptTag.src = './js/sub4_script.js';
    //     document.body.appendChild(scriptTag);
    // }
    // React.useEffect(()=>{
    //     createElement();
    // }, []);

    const [state, setState] = React.useState([]);

    const specialPrice=()=>{
        axios({
            url: './data/sp_product.json',
            method: 'GET'
        }).then((res)=>{
            // console.log('AXIOS 성공!', res);
            setState(res.data.특가혜택);
        }).catch((err)=>{
            // console.log('AXIOS 실패!', err);
        });
    };

    React.useEffect(()=>{
        specialPrice();
    }, []);


    return (
        <main id="sub" className="sub4">

            <section id="section1">
                <div className="container">
                    <div className="title hide">
                        <h2>특가/혜택</h2>
                    </div>
                    <div className="content">
                        <ul className="sp-product">
                            {/* <!-- <li>
                                <a href="#">
                                    <img src="./img/1a3e294c-9cc7-42a8-8cbb-732ed49fd51a.jpg" alt="">
                                </a>
                            </li> --> */}
                            
                            {
                            state.map((item, idx)=>{
                                return(
                                    <li key={idx}>
                                        <a href="!#" onClick={e => e.preventDefault()}>
                                            <img src={`./img/sub4/${item.제품이미지}`} alt=""/>
                                        </a>
                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Sub4Component;