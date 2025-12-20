import { useState } from 'react'
import './index.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Template from './Component/template';
import Home from './Component/home';
import Builder from './Component/builder';
import Login from './Component/login';
import Template1 from './Component/template1';
import Template2 from './Component/template2';
import axios from "axios";
import Signup from './Component/signup';
import Landing from './Component/landing';



function App(){
    const router = createBrowserRouter ([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/template",
            element: <Template/>
        },
        {
            path: "/builder",
            element: <Builder/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/template1",
            element: <Template1/>
        },
        {
            path: "/template2",
            element: <Template2/>
        },{
            path: "/signup",
            element: <Signup/>
        },{
            path: "/landing",
            element: <Landing/>
        }
    ])

    return (
        <>
        <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App

