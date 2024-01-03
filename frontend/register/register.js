function register() {
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const age = document.getElementById('age')
    const gender = document.getElementById('gender')
    const height = document.getElementById('height')
    const weight = document.getElementById('weight')
    const email = document.getElementById('email')
    // console.log('firstname', firstname.value)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "firstname": firstname.value, "lastname": lastname.value, "age": age.value, "gender": gender.value, "height": height.value, "weight": weight.value, "email": email.value, })
    }
    fetch("http://localhost:3000/api/register", options)
        .then(response => {
            console.log("Response: ", response);
    })
}