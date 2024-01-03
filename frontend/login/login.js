function login() {
    const email = document.getElementById('email')
    const errorMsg = document.getElementById('error-msg')
    const errorDiv = document.getElementById('error-div')
  // console.log('email', password.value)

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({"email": email.value, })
  }
  fetch("http://localhost:3000/api/login", options)
  .then(res => {
    if (res.ok) {
        return res.json()
    } else {
        errorDiv.classList.toggle("show")
        res.text().then(text => {
            let errMsg = JSON.parse(text);
            errorMsg.innerHTML = errMsg.msg;
        })
    }
})
}