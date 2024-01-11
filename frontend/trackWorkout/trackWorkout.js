let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
console.log('XXXXX', userId)



// Assuming userId is defined elsewhere in your code

fetch('/workout/' + userId)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data from the server:', data);
        displayWorkout(data);
        // Handle the data as needed (e.g., update the UI with the received data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error (e.g., update the UI to indicate an error)
    });


export default function displayWorkout(data) {
    let trackWorkoutContainer = document.getElementById('trackWorkoutContainer');

    data.forEach(workout => {
        let set = document.createElement('div');
        let exerciseId = document.createElement('p');
        console.log('exerciseId', exerciseId);
        exerciseId.innerHTML = workout.exerciseId;

        set.appendChild(exerciseId);
        trackWorkoutContainer.appendChild(set);
    });
}



