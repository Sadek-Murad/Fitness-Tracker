let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch("http://localhost:3000/api/profile/" + id)
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
.then(userData => {
  document.getElementById('firstname').innerHTML = userData.firstname;
  document.getElementById('lastname').innerHTML = userData.lastname;
  document.getElementById('age').innerHTML = userData.age;
  document.getElementById('gender').innerHTML = userData.gender;
  document.getElementById('height').innerHTML = userData.height;
  document.getElementById('weight').innerHTML = userData.weight;
  document.getElementById('bmi').innerHTML = userData.bmi;
  document.getElementById('email').innerHTML = userData.email;
  })
  .catch(error => console.error(error));localStorage

  