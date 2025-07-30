let wrong = document.getElementById("wrong");
let login = document.getElementById("login");
users = [
  {
    username: "hemanth sai",
    email: "madalahemanthsai1511@gmail.com",
    password: 12345,
  },
  {
    username: "Madhu",
    email: "madhubackup1423@gmail.com",
    password: 1234,
  },
];

login.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
   let matchedUser= users.find((user)=>user.email==email.value || user.username==email.value && user.password==password.value); 
    if (matchedUser) {
      console.log("login sucess");
        wrong.style.display = "none";
          window.location.href = "index.html"; 
    } else {
      console.log("login failed");
        wrong.style.display = "block";
        
    }
  });

