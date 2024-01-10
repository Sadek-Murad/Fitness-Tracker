let originalValues = {}; // Hier werden die ursprünglichen Werte gespeichert
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log('id', id)

// Make a simple GET request
fetch('https://127.0.0.1:3000/api/workout?' + id)
    .then(response => {
        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        return response.json();
    })
    .then(data => {
        // Handle the JSON data
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error during fetch operation:', error);
    });
