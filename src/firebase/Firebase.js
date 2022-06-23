
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAndc4MiZDR-eekFCMF-CwvkxOk--Onemc",
  authDomain: "firebassetodo.firebaseapp.com",
  projectId: "firebassetodo",
  storageBucket: "firebassetodo.appspot.com",
  messagingSenderId: "465547590954",
  appId: "1:465547590954:web:0a34157c6c6348ec72f253"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const login = () =>{
    const data = signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token)
      return user
    }).catch((error) => {
        alert(error.message);
      });
      return data;
}

const create = (email, password) =>{
   const data = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user
    })
    
    .catch((error) => {
    alert(error.message);
  
    });
    return data
}

const signin = (email, password) =>{
   const data = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    return user
    })
    .catch((error) => {
    alert(error.message)

    });
    return data
}

const logout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
        alert(error.message)
    })
}
export  {login, create, signin, logout, auth, app};