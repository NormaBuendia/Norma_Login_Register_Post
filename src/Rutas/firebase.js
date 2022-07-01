//import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
//import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
  }
  from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import { firebaseConfig } from "./configuFirebase.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//const db = getFirestore();

//const orderCollection = collection(db, "user");


export const authGoogle = () => {
  getRedirectResult(auth);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash = "#/muro";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode)
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
 // Crear nueva cuenta
  //Se exporta a su vista en js, se le agrega user name
  export const newRegister = (email, password, userName) => {
    createUserWithEmailAndPassword(auth, email, password, userName)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      emailVerification(auth);
      alert('Revisa tu correo')
      userName = auth.currentUser.displayName
      console.log (userName);
      console.log('created');
      // ...
      console.log('hola');
      window.location.hash ='#/home';
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('ingresa correo y contraseña válida');
      //console.log(errorCode+errorMessage)   
      const missingEmail = document.getElementById('missinEmail');
      const emailInUse = document.getElementById('registerEmailInUse');
      const emailNull = document.getElementById('loginEmailNull')
      //error en campo correo vacio
      if (errorCode == 'auth/missing-email') {
        missingEmail.style.display = 'block';
        emailInUse.style.display = 'none';
        emailNull.style.display ='none';
        console.log(errorCode);
        
      }
      if (errorCode == 'auth/invalid-email') {
        emailNull.style.display ='block';
        missingEmail.style.display = 'none';
        emailInUse.style.display = 'none';
        
      }
      // Mensaje correo ya existente
      if (errorCode == 'auth/email-already-in-use') {
        emailInUse.style.display = 'block';
        missingEmail.style.display = 'none';
        emailNull.style.display ='none';
      }

    });
    return createUserWithEmailAndPassword;
    };

  export const signIn = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location.hash = "#/muro"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode);
      window.location.hash = "#/home";
      const emailError = document.getElementById("invalidEmail");
      const passwordError = document.getElementById("invalidPassword");
      
      if (errorCode === "auth/invalid-email") {
        emailError.classList.toggle("hidden");
      }
      if (errorCode === "auth/wrong-password") {
        passwordError.classList.toggle("hidden");
      }


    })
    return signInWithEmailAndPassword;
  }

    const emailVerification = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        // console.log('correo enviado');
        // Email verification sent!
        // ...
      });
    };
  
   export const resetPassword = (email) =>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Revisa tu correo y reiniciar tu contraseña');
      // Password reset email sent!
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
   }
    
    export const logOut = () => {
      signOut(auth)
        .then(() => {
          alert("saliste");
          window.location.hash = "#/home";
        })
        .catch((error) => {
          // console.log('aun no haz salido')
          // An error happened.
        });
    };

