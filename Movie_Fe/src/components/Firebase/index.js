// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCbKQ37mcXzG8VlPUYBVMqUvq1WU4t9FTQ',
    authDomain: 'twtcinema.firebaseapp.com',
    projectId: 'twtcinema',
    storageBucket: 'twtcinema.appspot.com',
    messagingSenderId: '630122826959',
    appId: '1:630122826959:web:b776e34aa5cd00d2cf7bba',
};

// Initialize Firebase
export const firebaseConnect = initializeApp(firebaseConfig);
