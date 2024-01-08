fetch('http://localhost:3000/api/exercises')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayData(data);
        createWorkout(data)
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });




function createExerciseContainer(exercise) {
    let exerciseContainer = document.createElement("div")
    exerciseContainer.classList.add("d-flex")
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = exercise._id;
    checkbox.classList.add("btn-check");
    checkbox.setAttribute("autocomplete", "off");
    let label = document.createElement("label");
    label.classList.add("w-50")
    label.htmlFor = exercise._id;
    label.innerHTML = `${exercise.name}`;

    if (exercise.difficulty == "Easy") {
        label.classList.add("btn", "btn-outline-success")
    } else if (exercise.difficulty == "Medium") {
        label.classList.add("btn", "btn-outline-warning")
    } else {
        label.classList.add("btn", "btn-outline-danger")
    }

    let repsInput = document.createElement('input');
    repsInput.type = "number";
    repsInput.style = "width: 3em", "margin-left: 1em";
    repsInput.id = "reps-count" + exercise._id;

    let muscleBanner = document.createElement("span");
    muscleBanner.classList.add("mx-4", "justify-self-end")
    muscleBanner.textContent = `${exercise.muscle}`

    exerciseContainer.appendChild(checkbox);
    exerciseContainer.appendChild(label);
    exerciseContainer.appendChild(muscleBanner);
    exerciseContainer.appendChild(repsInput);

    return exerciseContainer
}

function createWorkout() {
    // console.log('exercise', exercise[0]._id)

    let elements = document.getElementsByClassName('list-group-item');

    Array.from(elements).forEach(element => {
        let checkbox = element.getElementsByClassName("btn-check");
        let id = checkbox.id;
        // console.log("element", element);
        let reps = element.querySelector('input[type="number"]');
        // let reps = element.getElementById('reps-count' + id);
        // let reps = element.querySelector('#reps-count' + id);
        // console.log('reps value', reps.value);
        if (reps && reps.value) {
            console.log('reps.value', reps.value, reps.id);
        }
    });

    // for (element of elements) {

    //     if (reps && reps.value) {
    //         console.log('reps', reps.value);
    //     }
    //     else {
    //         console.log("geht nicht");
    //     }

    //     /*   if (typeof (reps.value)) {
    //       } */


    //     // let count = element.getElementById("reps-count" + exercise._id);

    // }


}

function displayData(data) {

    const submitButtonContainer = document.getElementById('submit-button')

    const bodyweightList = document.getElementById('bodyweightList');
    const weightliftingList = document.getElementById('weightliftingList');
    const cardioList = document.getElementById('cardioList');

    const submitButton = document.createElement("button");
    submitButton.type = "submit"
    submitButton.innerHTML = "save"
    submitButton.addEventListener('click', createWorkout)
    submitButtonContainer.appendChild(submitButton)



    data.forEach(exercise => {


        if (exercise.type == "Bodyweight") {

            let exerciseContainer = createExerciseContainer(exercise);

            const listItem = document.createElement('li');
            listItem.classList.add("list-group-item")

            // listItem.textContent = `${exercise.name}, ${exercise.type}, ${exercise.difficulty}, ${exercise.muscle}`;
            listItem.appendChild(exerciseContainer)
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

