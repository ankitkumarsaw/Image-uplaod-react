
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAFQvoYIdXVPZWHoYXt0zTLV4SE83Qc78s",
  authDomain: "galleryauthorization.firebaseapp.com",
  projectId: "galleryauthorization",
  storageBucket: "galleryauthorization.appspot.com",
  messagingSenderId: "382309660806",
  appId: "1:382309660806:web:b9c27539030a434c117907",
  measurementId: "G-CPWWWW7BLD"
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