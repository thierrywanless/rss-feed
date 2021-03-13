import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa4N_qFVcS43On2X-YflEzwAudUHrn3QE",
  authDomain: "rss-feed-30b89.firebaseapp.com",
  projectId: "rss-feed-30b89",
  storageBucket: "rss-feed-30b89.appspot.com",
  appId: "1:35829901191:web:0f120b2a96f55fb0a8d522",
};

firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();

export { DB };
