fetch('https://fitness-tracker.byte-jumper.de:3000/api/exercises')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

function createExerciseContainer(exercise) {
    let exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("d-flex", "justify-content-between");
    exerciseContainer.setAttribute('aria-label', "Basic checkbox toggle button group");

    let exerciseName = document.createElement('p');
    exerciseName.id = exercise._id
    exerciseName.style = "margin-bottom: 0";
    exerciseName.innerText = `${exercise.name}`;

    /* let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = exercise._id;
    checkbox.classList.add("btn-check");
    checkbox.setAttribute("autocomplete", "off");

    let label = document.createElement("label");
    label.classList.add("w-50")
    label.htmlFor = exercise._id;
    label.innerHTML = `${exercise.name}`; */

    if (exercise.difficulty == "Easy") {
        exerciseName.classList.add("btn", "btn-success");
    } else if (exercise.difficulty == "Medium") {
        exerciseName.classList.add("btn", "btn-warning");
    } else {
        exerciseName.classList.add("btn", "btn-danger");
    }

    let setsInput = document.createElement('input');
    setsInput.type = "number";
    setsInput.style = "width: 3em"; "text-align: right";
    setsInput.id = "sets-count" + exercise._id;

    let muscleBanner = document.createElement("span");
    muscleBanner.classList.add("mx-4", "justify-self-end")
    muscleBanner.textContent = `${exercise.muscle}`

    exerciseContainer.appendChild(exerciseName);
    // exerciseContainer.appendChild(label);
    exerciseContainer.appendChild(muscleBanner);
    exerciseContainer.appendChild(setsInput);

    return exerciseContainer
}



function createWorkout() {
    // console.log('exercise', exercise[0]._id)

    let elements = document.getElementsByClassName('list-group-item');

    let exerciseList = [];

    Array.from(elements).forEach(element => {

        let paragraph = element.querySelector("p");
        let id = paragraph.id;
        let sets = element.querySelector('input[type="number"]');
        // console.log('element', element)

        if (sets && sets.value) {
            console.log('id', id)
            // console.log('sets.value', sets.value, sets.id);
            // let name = element.querySelector('p').innerText;
            // let muscle = element.querySelector('span').innerText;

            exerciseList.push({
                "userId": "659eac250754d960fdf04831",
                "exerciseId": id,
                "sets": sets.value,
            });

            console.log('exerciseList', exerciseList)
            window.location.href = "../trackWorkout/trackWorkout.html"
        }
    });
    console.log('CCCCCCCC', exerciseList)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
        },
        body: JSON.stringify(exerciseList),
    };

    fetch("https://fitness-tracker.byte-jumper.de:3000/api/workout/659eac250754d960fdf04831", requestOptions)
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
            // window.location.href = "http://127.0.0.1:5500/frontend/trackWorkout/trackWorkout.html?id=659eac250754d960fdf04831"
        })
        .catch(error => {
            // Handle errors
            console.error('POST error:', error);
        });
}

function displayData(data) {

    const submitButtonContainer = document.getElementById('submit-button');

    const bodyweightList = document.getElementById('bodyweightList');
    const weightliftingList = document.getElementById('weightliftingList');
    const cardioList = document.getElementById('cardioList');

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerHTML = "save";
    submitButton.classList.add("btn", "btn-primary")
    submitButton.style = "width: 100%; margin: 1em auto"
    submitButton.addEventListener('click', createWorkout);
    submitButtonContainer.appendChild(submitButton);

    data.forEach(exercise => {


        if (exercise.type == "Bodyweight") {

            let exerciseContainer = createExerciseContainer(exercise);

            const listItem = document.createElement('li');
            listItem.classList.add("list-group-item");

            // listItem.textContent = `${exercise.name}, ${exercise.type}, ${exercise.difficulty}, ${exercise.muscle}`;
            listItem.appendChild(exerciseContainer);
            bodyweightList.appendChild(listItem);
        }

        if (exercise.type == "Weightlifting") {

            let exerciseContainer = createExerciseContainer(exercise);

            const listItem = document.createElement('li');
            listItem.classList.add("list-group-item")

            // listItem.textContent = `${exercise.name}, ${exercise.type}, ${exercise.difficulty}, ${exercise.muscle}`;
            listItem.appendChild(exerciseContainer)
            weightliftingList.appendChild(listItem);
        }

        if (exercise.type == "Cardio") {

            let exerciseContainer = createExerciseContainer(exercise);

            const listItem = document.createElement('li');
            listItem.classList.add("list-group-item")

            // listItem.textContent = `${exercise.name}, ${exercise.type}, ${exercise.difficulty}, ${exercise.muscle}`;
            listItem.appendChild(exerciseContainer)
            cardioList.appendChild(listItem);
        }




    });



}

