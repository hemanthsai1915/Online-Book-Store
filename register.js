// register.js
import { auth, db, createUserWithEmailAndPassword } from "./firebase-config.js";
import {
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
document.addEventListener("DOMContentLoaded", () => {
  let submit = document.getElementById("reg");
  let wrong = document.getElementById("wrongconf");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confpass = document.getElementById("confirm").value;
    if (password !== confpass) {
      wrong.style.display = "block";
      return;
    } else {
      wrong.style.display = "none";
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          username: username,
          email: email,
        });
        alert("Account created sucessfully");
        window.location.href ="login.html";
      })
      .catch((error) => {
        console.error("signup error", error.message);
        alert("Error:" + error.message);
      });
  });
});
