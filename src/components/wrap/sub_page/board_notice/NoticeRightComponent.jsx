import React from 'react';
import { Link } from 'react-router-dom';

export default function NoticeRightComponent({공지사항}){

    // console.log(공지사항);

    const [state, setState] = React.useState({
        list: 10,  // 한 화면에 보이는 개수 (한 페이지의 줄 수)
        pageNumber: 1  // 시작 페이지 첫번째 = 전체 수 / 한 페이지 수
    });


    const onClickPageNum=(e, value)=>{
        e.preventDefault();

        setState({
            ...state,
            pageNumber: value
        });
    }


    return (
        <div className="right">
            <div className="title">
                <h3><strong>공지사항</strong><em>컬리의 새로운 소식들과 유용한 정보들을 한 곳에서 확인하세요.</em></h3>
            </div>          
            <div className='title-name'>
                <h4>번호</h4>
                <h4>제목</h4>
                <h4>작성자</h4>
                <h4>작성일</h4>
            </div>
            <ul>
                {
                    공지사항.map((item, idx)=>{  // 페이지 번호 0 1 2 3 4 / 5 6 7 8 9 / 10 11 12 13 14 ...
                        if(Math.ceil((idx + 1) / state.list) === state.pageNumber){

                            // console.log('idx: ' + idx);

                            return (
                                <Link to={"/공지사항글보기?listNum=" + item.글번호} key={item.글번호}>
                                    <li>                              
                                        <span>{item.글번호}</span>
                                        <span>{item.제목}</span>
                                        <span>{item.작성자}</span>
                                        <span>{`${new Date(item.작성일).getFullYear()}.${(new Date(item.작성일).getMonth() + 1) < 10 ? "0" + (new Date(item.작성일).getMonth() + 1) : (new Date(item.작성일).getMonth() + 1)}.${(new Date(item.작성일).getDate()) < 10 ? "0" + (new Date(item.작성일).getDate()) : (new Date(item.작성일).getDate())}`}</span>                                                                 
                                    </li>
                                </Link>
                            )
                        }                       
                    })                  
                }
            </ul>
            <div className="page-btn-box">
                {
                    공지사항.map((item, idx)=>{
                        if(idx < Math.ceil(공지사항.length / state.list)){
                            return (
                                <span key={idx}><a href="!#" onClick={(e)=>onClickPageNum(e, idx + 1)}>{idx + 1}</a></span>
                            )
                        }                       
                    })
                }               
            </div>
        </div>
    );
};