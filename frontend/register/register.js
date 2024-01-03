function register() {
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const age = document.getElementById('age')
    const gender = document.getElementById('gender')
    const height = document.getElementById('height')
    const weight = document.getElementById('weight')
    const email = document.getElementById('email')
    const errorMsg = document.getElementById('error-msg')
    const errorDiv = document.getElementById('error-div')
    // console.log('firstname', firstname.value)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "firstname": firstname.value, "lastname": lastname.value, "age": age.value, "gender": gender.value, "height": height.value, "weight": weight.value, "email": email.value, })
    }
    fetch("http://localhost:3000/api/register", options)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                errorDiv.classList.toggle("show")
                res.text().then(text => {
                    text.json().then(msg => {
                        errorMsg.innerHTML = msg.msg
                    })
                })
            }
        })
}