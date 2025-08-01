import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "./firebase-config.js";
let wrong = document.getElementById("wrong");
let login = document.getElementById("login");
let emailinp = document.getElementById("email");
let password = document.getElementById("password");

login.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailinp.value;
  const pwd = password.value;
  signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => { const user = userCredential.user; console.log("logged in as", user.email); window.location.href = "index.html"; }).catch((error) => {
    console.log("login failed"+error);
    if (wrong) {
      wrong.style.display = "block";
    }
  
  })
})
