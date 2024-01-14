const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('id');
console.log('XXXXX', userId)



// Assuming userId is defined elsewhere in your code

fetch('http://127.0.0.1:3000/api/workout/' + userId)
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

    // set status "inactive after save"

    let elementsList = [];
    let elements = document.querySelectorAll("input");
    console.log('elements', elements.value);

    elements.forEach(element => {
        console.log(element.value);

        elementsList.push(element.value)
        console.log('elementsList', elementsList)

    });

    let weights = elementsList
        .filter((element, index) => index % 2 == 0)

    console.log('weights', weights)

    let reps = elementsList
        .filter((element, index) => index % 2 !== 0)

    console.log('reps', reps)

    let savedWorkout = ({
        "userId": userId,
        "weights": weights,
        "reps": reps,
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        body: JSON.stringify(savedWorkout),
    };

    fetch("http://127.0.0.1:3000/api/savedworkout", requestOptions)
        .then(response => {
            // Check if the response status is OK (200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the response JSON
            return response.json();
        })
        .then(data => {
            // Handle the response data
            console.log('POST successful:', data);
            window.location.href = "http://127.0.0.1:5500/frontend/trackWorkout/trackWorkout.html" + userId;
        })
        .catch(error => {
            // Handle errors
            console.error('POST error:', error);
        });

}

function displayWorkout(data) {
    let trackWorkoutContainer = document.getElementById('trackWorkoutContainer');

    data.userWorkouts.forEach(workout => {

        for (let i = 1; i <= workout.sets; i++) {

            // console.log('workout', workout)
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
            weight.classList.add('weight', 'mx-4')

            let reps = document.createElement('input');
            reps.classList.add('reps', 'mx-4')

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



