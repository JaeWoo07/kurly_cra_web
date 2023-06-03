import React from 'react';
import Section1Component from './main/Section1Component.jsx';
import Section2Component from './main/Section2Component.jsx';
import Section3Component from './main/Section3Component.jsx';
import Section4Component from './main/Section4Component.jsx';
import Section5Component from './main/Section5Component.jsx';
import Section6Component from './main/Section6Component.jsx';
import Section7Component from './main/Section7Component.jsx';
import Section8Component from './main/Section8Component.jsx';

function MainComponent(){

    // 제이쿼리 페이지 전환 시
    // 스크립트를 생성하고 아이디를 지정한 후, 제이쿼리를 다시 로딩시킨다.
    // 그리고 헤드에 있는 스크립트만 그대로 두고
    // 생성된 스크립트 아이디를 제거 한다.
    const createElement=()=>{
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('id','script');
        scriptTag.setAttribute('src', './js/intro.js');
        // scriptTag.src = './js/intro.js';
        document.body.appendChild(scriptTag);
    }

    React.useEffect(()=>{
        createElement();
    }, []);


    // 스크립트 제거
    // 제거 할 스크립트 선택자의 부모 요소 지정 후 삭제.
    React.useEffect(()=>{
        let parentEl = document.getElementById('script').parentElement; // 부모요소
        let childEl = document.getElementById('script');  // 자식요소 (제거 대상)

        parentEl.removeChild(childEl);
    }, []);


    return (

        <main id="main">
            <Section1Component/>
            <Section2Component/>
            <Section3Component/>
            <Section4Component/>
            <Section5Component/>
            <Section6Component/>
            <Section7Component/>
            <Section8Component/>
        </main>
    );
};

export default MainComponent;