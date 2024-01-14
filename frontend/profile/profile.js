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

  function calculateBMI(height, weight) {
    if (height > 0 && weight > 0) {
        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        updateBMIScale(bmi);
        return bmi;
    }
    return 'Nicht verfügbar';
}

function updateBMIScale(bmi) {
    const pointer = document.getElementById('bmiPointer');
    const scaleWidth = document.getElementById('bmiScale').offsetWidth;
    const maxBMI = 40; // Maximaler Wert auf der Skala
    const position = (bmi / maxBMI) * scaleWidth;
    pointer.style.left = `${Math.min(position, scaleWidth - 10)}px`; 
    
    if (bmi < 18.5 || bmi > 25) {
        pointer.style.backgroundColor = 'red';
    } else {
        pointer.style.backgroundColor = 'green';
    }
}


  

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
  document.getElementById('bmiText').innerHTML = calculateBMI(userData.height, userData.weight);
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

// lougout

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
      logoutButton.addEventListener('click', async () => {
          try {
              const response = await fetch('/logout', {
                  method: 'GET',
              });

              if (response.ok) {
                  window.location.href = '/home'; // Weiterleitung nach dem Logout
              } else {
                  console.error('Logout fehlgeschlagen.');
                  // Behandle den Fehler, wenn der Logout fehlschlägt
              }
          } catch (error) {
              console.error('Fehler beim Logout:', error);
              // Handle andere Fehler, die beim Logout auftreten könnten
          }
      });
  } else {
      console.error('Das Element logoutButton wurde nicht gefunden.');
  }
});


// logout

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: 'GET',
    });

    if (response.ok) {
      window.location.href = '/'
    } else {
      console.error('Logout fehlgeschlagen.');
    
    }
  } catch (error) {
    console.error('Fehler beim Logout:', error);
    
  }
});