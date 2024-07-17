import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCK2xiHZRdt_eB-xphd_jVc96QFlJ40qog',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'atlas-world---quiz-app-7f8c6',
  storageBucket: 'atlas-world---quiz-app-7f8c6.appspot.com',
  //   messagingSenderId: "sender-id",
  appId: '1:816179881247:android:e62297a2dbaa5e8983fc2a',
  //   measurementId: "G-measurement-id",
};

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
