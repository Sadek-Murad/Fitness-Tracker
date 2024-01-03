function login() {
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  // console.log('email', password.value)

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({"email": email.value, "password": password.value, })
  }
  fetch("http://localhost:3000/api/login", options)
      .then(response => {
          console.log("Response:", response);
  })
}