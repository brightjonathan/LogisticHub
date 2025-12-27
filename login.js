import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } 
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

/* ---------- LOGIN ---------- */
window.loginBtn = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful ✅");
      window.location.href = "Admin/index.html"; // optional redirect
    })
    .catch((error) => {
      alert("invalid email or password ❌");
    });
};