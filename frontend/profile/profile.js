let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert

// GET Params aus URl holen
http://localhost:5500/profile.html?id=

fetch("http://localhost:3000/api/profile/6596921b8cb903d3edf57f1c")
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
        console.error('Fehler beim Laden der Daten:', res.status);
    }
  })
  .then(userData => {
    originalValues = userData;
    displayUserData(userData);
  })
  .catch(error => console.error(error));

function displayUserData(userData) {
  // Anzeige der Benutzerdaten auf der Seite
  document.getElementById('firstname').innerHTML = userData.firstname;
  document.getElementById('lastname').innerHTML = userData.lastname;
  document.getElementById('ageText').innerHTML = userData.age;
  document.getElementById('genderText').innerHTML = userData.gender;
  document.getElementById('heightText').innerHTML = userData.height;
  document.getElementById('weightText').innerHTML = userData.weight;
  document.getElementById('bmiText').innerHTML = userData.bmi;
  document.getElementById('email').innerHTML = userData.email;
}

function setDisplayFields(displayStyle) {
  const editableFields = ['age', 'gender', 'height', 'weight', 'bmi'];
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