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

  function edit() {
    setDisplayFields('inline-block');
  
    displayUserData(originalValues);
  
    document.querySelector('button[onclick="edit()"]').style.display = 'none';
    document.querySelector('button[onclick="save()"]').style.display = 'inline-block';
  }
  
  function save() {
    setDisplayFields('none');
    document.querySelector('button[onclick="edit()"]').style.display = 'inline-block';
    document.querySelector('button[onclick="save()"]').style.display = 'none';
  
    const updatedData = {
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      height: document.getElementById('height').value,
      weight: document.getElementById('weight').value,
      bmi: document.getElementById('bmi').value
    };
  
    fetch('http://localhost:3000/api/profile/6596921b8cb903d3edf57f1c', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Daten erfolgreich aktualisiert');
          window.location.href = window.location.href;
        } else {
          console.error('Fehler beim Aktualisieren der Daten');
        }
      })
      .catch(error => {
        console.error('Fetch-Fehler:', error);
      });
  }