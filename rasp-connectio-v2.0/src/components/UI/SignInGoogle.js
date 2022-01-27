import React from 'react';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const signInGoogle=()=>{
    // const GOOGLE_BUTTON_ID='188480538697-fhn5jrsulrnngn5sjs80ol354ul48bfd';
    const config={
        apiKey: "AIzaSyA8OoZ5_fmLW2aZoF0ApAuVc3Jw_8Gr2Pw",
        authDomain: "domotizacion-7b77e.firebaseapp.com",
        projectId: "domotizacion-7b77e",
        storageBucket: "domotizacion-7b77e.appspot.com",
        messagingSenderId: "188480538697",
        appId: "1:188480538697:web:c64250d7ca5fb82f0c1798",
        measurementId: "G-NFJESQ1WP0"
    }
    firebase.initializeApp(config);
    return (<div></div>)
}
export default signInGoogle;