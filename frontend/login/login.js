function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // console.log('email', password.value)

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": email, "password": password, })
  }
  fetch("http://localhost:3000/api/login", options)
      .then(response => {
          console.log("Response: ", response);
  })
}