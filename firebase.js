import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDxa_32ip0rf42KJv1-cL9bpp3vHBhlb9o",
    authDomain: "webd303test-acf84.firebaseapp.com",
    databaseURL: "https://webd303test-acf84.firebaseio.com",
    projectId: "webd303test-acf84",
    storageBucket: "webd303test-acf84.appspot.com",
    messagingSenderId: "220814046026",
    appId: "1:220814046026:web:ace15aae6e8cd30c1847b3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;