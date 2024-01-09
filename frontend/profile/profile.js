let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch("http://localhost:3000/api/profile/" + id)
  .then(res => {
    if (res.ok) {

      return res.json();
    } else {
      console.error('Fehler beim Laden der Daten:', res.status);
    }
  })
  .then(userData => {
    originalValues = userData;
    console.log(originalValues);
    displayUserData(userData);
  })
  .catch(error => console.error(error));

function displayUserData(userData) {
  // Anzeige der Benutzerdaten auf der Seite
  document.getElementById('profileImage').src = originalValues.profileImage;
  document.getElementById('firstname').innerHTML = originalValues.firstname;
  document.getElementById('lastname').innerHTML = originalValues.lastname;
  document.getElementById('ageText').innerHTML = originalValues.age;
  document.getElementById('genderText').innerHTML = originalValues.gender;
  document.getElementById('heightText').innerHTML = originalValues.height;
  document.getElementById('weightText').innerHTML = originalValues.weight;
  document.getElementById('bmiText').innerHTML = originalValues.bmi;
  document.getElementById('email').innerHTML = originalValues.email;
}

function setDisplayFields(displayStyle) {
  const editableFields = ['age', 'gender', 'height', 'weight'];
  editableFields.forEach(field => {
    document.getElementById(`${field}Text`).style.display = displayStyle === 'none' ? 'inline-block' : 'none';
    document.getElementById(field).style.display = displayStyle;
  });
}

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