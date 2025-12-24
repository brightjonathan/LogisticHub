// auth.js  (MODULE FILE)

// Firebase SDK imports (MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";


// Firebase config
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
//   const auth = getAuth(app);
  const db = getFirestore(app);


    // SENDING MASSEGE FUNCTIONALITY
const SendMsg = document.getElementById("sendMsg");


SendMsg.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const name =  document.getElementById("Name").value.trim();
    const email =  document.getElementById("Email").value.trim();
    const subject =  document.getElementById("subject").value.trim();
    const message =  document.getElementById("message").value.trim();

    // 🔥 Save to Firestore
        await addDoc(collection(db, "MESSAGE"), {
           name,
           email,
           subject,
           message,
          createdAt: serverTimestamp(),
        });

        alert("✅ Message sent successfully!");
        SendMsg.reset();
  } catch (error) {
    console.log("Firestore Error:", error);
    alert("❌ Failed to add user");
    
  }

});