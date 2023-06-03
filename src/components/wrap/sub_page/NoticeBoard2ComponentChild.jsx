import React from 'react';

function NoticeBoard2ComponentChild({자주하는질문}){
    return (
        <ul>
            {
                자주하는질문.map((item, idx)=>{
                    return (
                        <li key={idx}>
                            <span>{item.번호}</span>
                            <span>{item.카테고리}</span>
                            <span>{item.제목}</span>
                        </li>
                    )
                })
            }           
        </ul>
    );
};

export default NoticeBoard2ComponentChild;