function register() {
    console.log('Register');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
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
            "id": id, "age": age.value, "gender": gender.value, "height": height.value, "weight": weight.value
        })
    }
    fetch("https://fitness-tracker.byte-jumper.de:3000/api/additional-info", options)
        .then(res => {
            console.log("RESPONSE", res);
            if (res.ok) {
                console.log(res.url);
                window.location.assign(res.url);
            } else {
                errorDiv.classList.toggle("show")
                res.text().then(text => {
                    let errMsg = JSON.parse(text);
                    errorMsg.innerHTML = errMsg.msg;
                })
            }
        })
}

const button = document.getElementById('send-button');
button.addEventListener("click", (e) => {
    e.preventDefault();
    register();
});