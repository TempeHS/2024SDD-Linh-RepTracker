// Function to toggle the display of input fields
function toggleInputFields() {
    const inputFields = document.querySelector('.input-fields');
    inputFields.style.display = inputFields.style.display === 'none' ? 'block' : 'none'; // Toggles display property between 'block' and 'none'
}

// Function to remove an entry from stored data
function removeEntry(index) {
    let storedData = JSON.parse(localStorage.getItem('routineData')) || []; // Retrieves stored data from localStorage or initializes an empty array
    storedData.splice(index, 1); // Removes an entry from stored data array
    localStorage.setItem('routineData', JSON.stringify(storedData)); // Updates stored data in localStorage
    displayEntry(); // Calls function to display updated entry
}

// Function to add a workout to the list
function addWorkout() {
    const workoutNameInput = document.getElementById('workoutName');
    const workoutList = document.getElementById('workoutsList');

    if (workoutNameInput.value.trim() !== '') { // Checks if input value is not empty
        const workoutItem = document.createElement('div'); // Creates a new div element
        workoutItem.innerHTML = `<p>${workoutNameInput.value}</p>
                        <button class="go-back-button" onclick="removeWorkoutItem(this)">Remove</button>`; // Sets HTML content for workout item
        workoutList.appendChild(workoutItem); // Appends workout item to the workout list
        workoutNameInput.value = ''; // Resets input value
    }
}

// Function to remove a workout item from the list
function removeWorkoutItem(button) {
    const workoutItem = button.parentNode; // Gets parent node of the button (the workout item)
    workoutItem.parentNode.removeChild(workoutItem); // Removes the workout item from its parent (the workout list)
}

// Function to save entered data
function saveData() {
    let storedData = JSON.parse(localStorage.getItem('routineData')) || []; // Retrieves stored data from localStorage or initializes an empty array
    const day = document.getElementById('day').value; // Gets selected day
    const typeOfWorkout = document.getElementById('typeOfWorkout').value; // Gets entered type of workout

    const workouts = [];
    const workoutList = document.getElementById('workoutsList').getElementsByTagName('p');
    for (let i = 0; i < workoutList.length; i++) {
        workouts.push(workoutList[i].innerText); // Adds each workout from the list to the workouts array
    }

    storedData.push({
        day: day,
        typeOfWorkout: typeOfWorkout,
        workouts: workouts,
    }); // Pushes new entry to stored data array

    document.getElementById('workoutsList').innerHTML = ''; // Clears the workout list
    localStorage.setItem('routineData', JSON.stringify(storedData)); // Updates stored data in localStorage
    document.getElementById('day').value = 'Monday'; // Resets selected day
    document.getElementById('typeOfWorkout').value = ''; // Resets entered type of workout
    displayEntry(); // Calls function to display updated entry
}

// Function to display stored data entries
function displayEntry() {
    let storedData = JSON.parse(localStorage.getItem('routineData')) || []; // Retrieves stored data from localStorage or initializes an empty array
    let detailsHTML = '';
    storedData.forEach((out, index) => {
        // Generates HTML for each stored data entry
        detailsHTML += `<div class="detail-box">
                            <button class="delete-button" onclick="removeEntry(${index})">-</button>
                            <p>Day: ${out.day}</p>
                            <p>Type of Workout: ${out.typeOfWorkout}</p>`;
        
        if (out.workouts && out.workouts.length > 0) {
            // Adds workouts list if available
            detailsHTML += `<p>Workouts:</p><ul>`;
            out.workouts.forEach(workout => {
                detailsHTML += `<li>${workout}</li>`;
            });
            detailsHTML += `</ul>`;
        }

        detailsHTML += `</div>`;
    });
    document.getElementById("ele").innerHTML = detailsHTML; // Sets generated HTML to the specified element
}

// Function to navigate back in history
function goBack() {
    window.history.back(); // Navigates back in browser history
}

// Calls displayEntry function when the window is fully loaded
window.onload = function() {
    displayEntry(); // Displays stored data entries when the page is loaded
};