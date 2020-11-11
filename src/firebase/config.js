import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC2nX820yGUWwqSuRuIis_x3kVhUCU5WQc",
    authDomain: "marketplace-busca-varejos.firebaseapp.com",
    databaseURL: "https://marketplace-busca-varejos.firebaseio.com",
    projectId: "marketplace-busca-varejos",
    storageBucket: "marketplace-busca-varejos.appspot.com",
    messagingSenderId: "381624867348",
    appId: "1:381624867348:web:d4f35d7500186f5aaee501"
};

export default firebase.initializeApp(firebaseConfig);