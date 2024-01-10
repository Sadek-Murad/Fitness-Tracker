let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

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

function createWithId() {
  console.log('id', id)

  try {
    const response = fetch('/exercises', {
      method: 'GET',
    });

    if (response.ok) {
      window.location.href = "http://localhost:5500/frontend/createWorkout/createWorkout.html?id=659eac250754d960fdf04831";
    } else {
      console.error('Logout fehlgeschlagen.');
      // Behandle den Fehler, wenn der Logout fehlschlägt
    }
  } catch (error) {
    console.error('Fehler beim Logout:', error);
    // Handle andere Fehler, die beim Logout auftreten könnten
  }


}