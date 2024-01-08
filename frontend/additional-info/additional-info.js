function register() {
    const age = document.getElementById('age')
    const gender = document.getElementById('gender')
    const height = document.getElementById('height')
    const weight = document.getElementById('weight')
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
            "firstname": "age": age.value, "gender": gender.value, "height": height.value, "weight": weight.value
        })
    }
    fetch("http://localhost:3000/api/additional-info", options)
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