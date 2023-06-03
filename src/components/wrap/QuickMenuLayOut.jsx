import React from 'react';
import QuickMenuComponent from './QuickMenuComponent';
import {Outlet} from 'react-router-dom';

function QuickMenuLayOut(){
    return (
        <>
            <QuickMenuComponent/>
            <Outlet/>
        </>        
    );
};

export default QuickMenuLayOut;