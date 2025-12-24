// auth.js  (MODULE FILE)

// Firebase SDK imports (MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getCountFromServer
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
  const auth = getAuth(app);
  const db = getFirestore(app);


/* 🔐 PROTECT PAGE */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../login.html";
  }
});


/* 🚪 LOGOUT FUNCTION */
  window.logout = async function () {
    const confirmed = confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    try {
      await signOut(auth);
      window.location.href = "../login.html";
    } catch (err) {
      console.error("Sign-out error:", err);
      alert("Unable to sign out. Please try again.");
    }
  };


  //ADD USER FUNCTIONALITY
  // 📦 ADD USER TO FIRESTORE
const form = document.getElementById("userForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const street = document.getElementById("street").value.trim();
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postalCode").value.trim();

    const gender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;

    // 🔥 Save to Firestore
    await addDoc(collection(db, "ADDUSERS"), {
       author: { 
        name: 'ADMIN', 
        id: auth.currentUser.uid, 
        email: auth.currentUser.email 
      },
      fullName,
      email,
      phone,
      gender,
      address: {
        street,
        city,
        country,
        postalCode
      },
      createdAt: serverTimestamp(),
    });

    alert("✅ User added successfully!");
    form.reset();

  } catch (error) {
    console.error("Firestore Error:", error);
    alert("❌ Failed to add user");
  }
});




// ADD SHIPMENT FUNCTIONALITY
// GET THE FORM
const shipmentForm = document.getElementById('addshipmentform');

shipmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    // Shipper Info
    const shipperName = document.getElementById("shipperName").value.trim();
    const shipperPhone = document.getElementById("shipperPhone").value.trim();
    const shipperEmail = document.getElementById("shipperEmail").value.trim();
    const shipperAddress = document.getElementById("shipperAddress").value.trim();
    const shipperState = document.getElementById("shipperState").value.trim();
    const shipperCountry = document.getElementById("shipperCountry").value.trim();

    // Receiver Info
    const receiverName = document.getElementById("receiverName").value.trim();
    const receiverPhone = document.getElementById("receiverPhone").value.trim();
    const receiverEmail = document.getElementById("receiverEmail").value.trim();
    const receiverAddress = document.getElementById("receiverAddress").value.trim();
    const receiverState = document.getElementById("receiverState").value.trim();
    const receiverCountry = document.getElementById("receiverCountry").value.trim();

    // Shipment Info
    const shipmentType = document.getElementById("shipmentType").value;
    const weight = document.getElementById("weight").value.trim();
    const courier = document.getElementById("courier").value.trim();
    const packageCount = document.getElementById("packageCount").value;
    const product = document.getElementById("product").value.trim();
    const quantity = document.getElementById("quantity").value;

    // More Details
    const paymentMethod = document.getElementById("paymentMethod").value;
    const totalFreight = document.getElementById("totalFreight").value;
    const carrier = document.getElementById("carrier").value;
    const carrierRef = document.getElementById("carrierRef").value;
    const departureTime = document.getElementById("departureTime").value;
    const pickupDate = document.getElementById("pickupDate").value;

    // Package Details
    const pickupTime = document.getElementById("pickupTime").value;
    const expectedDelivery = document.getElementById("expectedDelivery").value;
    const packageQuantity = document.getElementById("packageQuantity").value;
    const description = document.getElementById("description").value.trim();
    const length = document.getElementById("length").value;
    const height = document.getElementById("height").value;

    // SAVE TO FIRESTORE
    await addDoc(collection(db, "SHIPMENT"), {
      author: {
        name: 'ADMIN',
        id: auth.currentUser.uid,
        email: auth.currentUser.email,
      },
      shipper: {
        name: shipperName,
        phone: shipperPhone,
        email: shipperEmail,
        address: shipperAddress,
        state: shipperState,
        country: shipperCountry,
      },
      receiver: {
        name: receiverName,
        phone: receiverPhone,
        email: receiverEmail,
        address: receiverAddress,
        state: receiverState,
        country: receiverCountry,
      },
      shipment: {
        type: shipmentType,
        weight,
        courier,
        packageCount,
        product,
        quantity,
      },
      moreDetails: {
        paymentMethod,
        totalFreight,
        carrier,
        carrierRef,
        departureTime,
        pickupDate,
      },
      packageDetails: {
        pickupTime,
        expectedDelivery,
        packageQuantity,
        description,
        length,
        height,
      },
      createdAt: serverTimestamp(),
    });

    alert("✅ Shipment added successfully!");
    shipmentForm.reset();

  } catch (err) {
    console.error("Firestore Error:", err);
    alert("❌ Failed to add shipment");
  }
});



// displaying the total number of users, shipments, messages
const loadDashboardCounts= async()=> {
  try {
    // USERS
    const usersSnap = await getCountFromServer(collection(db, "ADDUSERS"));
    document.getElementById("totalUsers").textContent = usersSnap.data().count;

    // MESSAGES
    const msgSnap = await getCountFromServer(collection(db, "MESSAGE"));
    document.getElementById("totalMessages").textContent = msgSnap.data().count;

    // SHIPMENTS
    const shipSnap = await getCountFromServer(collection(db, "SHIPMENT"));
    document.getElementById("totalShipments").textContent = shipSnap.data().count;

  } catch (error) {
    console.error("Dashboard count error:", error);
  }
}

// Call when page loads
loadDashboardCounts();
