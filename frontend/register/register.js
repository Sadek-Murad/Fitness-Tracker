function register() {
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const age = document.getElementById('age')
    const gender = document.getElementById('gender')
    const height = document.getElementById('height')
    const weight = document.getElementById('weight')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const bmi = (weight.value / ((height.value / 100) * (height.value / 100)))
    const errorMsg = document.getElementById('error-msg')
    const errorDiv = document.getElementById('error-div')
    // console.log("BMI", bmi)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "firstname": firstname.value, "lastname": lastname.value, "age": age.value, "gender": gender.value, "height": height.value, "weight": weight.value, "email": email.value, "password": password, "bmi": bmi
        })
    }
    fetch("http://localhost:3000/api/register", options)
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