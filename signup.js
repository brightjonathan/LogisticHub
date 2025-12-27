

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMEdWetMVAcU67LE9Ap2OK0Hc7xM0eRaY",
  authDomain: "logisticahub-6c129.firebaseapp.com",
  projectId: "logisticahub-6c129",
  storageBucket: "logisticahub-6c129.firebasestorage.app",
  messagingSenderId: "811773110824",
  appId: "1:811773110824:web:1738991164c323341b631d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ---------- SIGN UP ---------- */
window.signupBtn = async() => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful 🎉");
      window.location.href = "login.html"; // optional redirect
    })
    .catch((error) => {
      alert(error.message);
      alert("Signup failed ❌");
    });
};
