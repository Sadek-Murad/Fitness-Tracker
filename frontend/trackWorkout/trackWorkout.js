let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
console.log('XXXXX', userId)



// Assuming userId is defined elsewhere in your code

fetch('https://fitness-tracker.byte-jumpder.de:3000/api/workout/' + userId)
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


function saveWorkout() {

    let elements = document.querySelector('input');
    console.log('elements', elements)

}

export default function displayWorkout(data) {
    let trackWorkoutContainer = document.getElementById('trackWorkoutContainer');

    data.userWorkouts.forEach(workout => {

        for (let i = 1; i <= workout.sets; i++) {

            console.log('workout', workout)
            let setForm = document.createElement('form');

            let setContainer = document.createElement('div');
            setContainer.classList.add('border', 'p-3', 'mb-4')

            let container = document.createElement('div')
            container.classList.add('d-flex')

            let name = document.createElement('p');
            name.innerHTML = "name";

            let set = document.createElement('p');
            set.innerText = "set"

            let weight = document.createElement('input');
            weight.classList.add('mx-4')

            let reps = document.createElement('input');
            reps.classList.add('mx-4')

            setContainer.appendChild(name);
            setContainer.appendChild(container);
            container.appendChild(set);
            container.appendChild(weight);
            container.appendChild(reps);
            setForm.appendChild(setContainer)
            trackWorkoutContainer.appendChild(setForm);
        }

    });
}



