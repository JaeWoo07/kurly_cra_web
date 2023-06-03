import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

function QuickMenuComponent(){

    React.useEffect(()=>{

        // 윈도우 스크롤 이벤트 구현
        $(window).scroll(function(){
            if($(window).scrollTop() >= 300){
                $('#quickMenu').addClass('on');  // 헤더에 on클래스를 추가한다.
            }
            else{
                $('#quickMenu').removeClass('on');  // 헤더에 on클래스를 삭제한다.
            }
        });     

    }, []);

    return (
        <div id="quickMenu">
            <ul>
                <li>
                    <Link to="/배송안내"><img src="./img/deliveryInfo_20221122-9988ad6f6927b33d079e3f89e9d8826f.png" alt=""/></Link>
                </li>
                <li>
                    <Link to="#" onClick={e => e.preventDefault()}>등급별 혜택</Link>
                </li>
                <li>
                    <Link to="#" onClick={e => e.preventDefault()}>레시피</Link>
                </li>
            </ul>
        </div>
    );
};

export default QuickMenuComponent;