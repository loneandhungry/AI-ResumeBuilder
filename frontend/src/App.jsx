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
import Builder2 from './Component/builder2';
import Builder3 from './Component/builder3';
import Builder1 from './Component/builder1';
import About from './Component/about';
import Contact from './Component/contact';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // or "smooth"
    });
  }, [pathname]);

  return null;
}



function App(){
    
    const router = createBrowserRouter ([
        {
            path: "/",
            element: <><ScrollToTop/><Home/></> 
        },
        {
            path: "/template",
            element: <><ScrollToTop/><Template/></>
        },
        {
            path: "/builder",
            element: <><ScrollToTop/><Builder/></>
        },
        {
            path: "/login",
            element: <><ScrollToTop/><Login/></>
        },
        {
            path: "/template1",
            element: <><ScrollToTop/><Template1/></>
        },
        {
            path: "/template2",
            element: <><ScrollToTop/><Template2/></>
        },{
            path: "/signup",
            element: <><ScrollToTop/><Signup/></>
        },{
            path: "/landing",
            element: <><ScrollToTop/><Landing/></>
        },
        {
            path: "/builder2",
            element: <><ScrollToTop/><Builder2/></>
        },
        {
          path: "/builder3",
          element: <><ScrollToTop/><Builder3/></>
        },
        {
          path: "/builder1",
          element: <><ScrollToTop/><Builder1/></>
        },
        {
            path: "/about",
            element: <><ScrollToTop/><About/></>
        },
        {
            path: "/contact",
            element: <><ScrollToTop/><Contact/></>
        }
    ])

    return (
        <>
        <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App

