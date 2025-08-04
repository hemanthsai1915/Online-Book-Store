import {
  auth,
  dbf,
  signOut,
  onAuthStateChanged
} from "./firebase-config.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// DOM
const cartContainer = document.getElementById("cartContainer");
const userEmail = document.getElementById("userEmail");

// Check Auth
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userEmail.textContent = `Welcome, ${user.email}`;
    loadCart(user.uid);
  } else {
    window.location.href = "login.html";
  }
});

// Load Cart Items
async function loadCart(uid) {
  cartContainer.innerHTML = "";

  const cartRef = collection(dbf, "users", uid, "cart");
  const snapshot = await getDocs(cartRef);

  if (snapshot.empty) {
    cartContainer.innerHTML = `<p>No books in cart.</p>`;
    return;
  }

  snapshot.forEach(docSnap => {
    const { title, author, img } = docSnap.data();

    const col = document.createElement("div");
    col.className = "col-md-3";

    col.innerHTML = `
      <div class="card mb-3">
        <img src="${img}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h6 class="card-title">${title}</h6>
          <p class="card-text"><small>${author}</small></p>
          <button class="btn btn-danger btn-sm" onclick="removeItem('${docSnap.id}')">Remove</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(col);
  });
}

// Remove Item
window.removeItem = async function (docId) {
  const user = auth.currentUser;
  if (!user) return;

  const itemRef = doc(dbf, "users", user.uid, "cart", docId);
  await deleteDoc(itemRef);
  loadCart(user.uid); // reload after deletion
};

// Logout
window.logout = function () {
  signOut(auth)
    .then(() => window.location.href = "login.html")
    .catch(err => alert("Error: " + err.message));
};
