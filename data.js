import {
  auth,
  signOut,
  onAuthStateChanged,
  dbf,
} from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Show logged-in user email
onAuthStateChanged(auth, user => {
  const welcomeEl = document.getElementById('welcomeUser');
  if (user) {
    welcomeEl.textContent = `Welcome, ${user.email}`;
  } else {
    window.location.href = "login.html";
  }
});

// Logout function
window.logout = function () {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully");
      window.location.href = "login.html";
    })
    .catch(error => {
      alert("Logout error: " + error.message);
    });
}



let cont = document.getElementById('content-container');
let inp = document.getElementById('searchInput');

// Load books based on value
async function loadBooks(query) {
  if (!query) return;

  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  cont.innerHTML = ""; // clear previous content

  data.docs.slice(0, 30).forEach(book => {
    const coverId = book.cover_i;
    const imgSrc = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : `https://via.placeholder.com/150x220?text=No+Cover`;

    const card = document.createElement('div');
    card.className = "card";
    card.style.width = "160px";
    card.style.margin = "10px";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${book.title}" class="card-img-top" />
      <div class="p-2">
        <h6 class="mb-1">${book.title}</h6>
        <small class="text-muted">${book.author_name?.[0] || 'Unknown Author'}</small>
      </div>
    `;

    // ✅ Create and append the Add to Cart button once
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-sm btn-success mt-2';
    addBtn.textContent = 'Add to Cart';
    addBtn.onclick = () => addToCart(
      book.title,
      book.author_name?.[0] || 'Unknown Author',
      imgSrc
    );

    const cardBody = card.querySelector('.p-2');
    cardBody.appendChild(addBtn); // append only once

    cont.appendChild(card); // add the card to the page
  });
 
}


// Category button click events
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => loadBooks(btn.value));
});



// Handle search form submission
window.addToCart = async function (title, author, img) {
  const user = auth.currentUser;
  if (!user) {
    alert("Please login first.");
    return;
  }
console.log("Current user:", user);
console.log("Adding to Firestore:", title, author, img);

  const cartRef = collection(dbf, "users", user.uid, "cart");
 const q = query(cartRef, where("title", "==", title));
  const existingDocs = await getDocs(q);

  if (!existingDocs.empty) {
    alert("📕 This book is already in your cart.");
    return;
  }
  try {
    await addDoc(cartRef, {
      title,
      author,
      img
    });
    alert("Book added to cart!");
  } catch (error) {
    console.error("Add to cart failed", error);
    alert("Something went wrong.");
  }
};

