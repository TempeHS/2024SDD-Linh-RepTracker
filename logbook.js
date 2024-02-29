// Function to toggle the visibility of input fields
function toggleInputFields() {
    // Selecting input fields container
    const inputFields = document.querySelector('.input-fields');
    // Toggling the display property between 'block' and 'none'
    inputFields.style.display = inputFields.style.display === 'none' ? 'block' : 'none';
}

// Function to remove an entry from localStorage based on index
function removeEntry(index) {
    // Retrieving stored data from localStorage or initializing an empty array if not present
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    // Removing the entry at the specified index
    storedData.splice(index, 1);
    // Updating localStorage with the modified data
    localStorage.setItem('logbookData', JSON.stringify(storedData));
    // Calling displayEntry to refresh the displayed entries
    displayEntry();
}

// Function to save input data to localStorage
function saveData() {
    // Retrieving stored data from localStorage or initializing an empty array if not present
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    // Adding new entry to the stored data
    storedData.push({
        workoutName: document.getElementById('workoutName').value,
        sets: document.getElementById('sets').value,
        reps: document.getElementById('reps').value,
        weight: document.getElementById('weight').value,
        date: document.getElementById('date').value
    });
    // Updating localStorage with the modified data
    localStorage.setItem('logbookData', JSON.stringify(storedData));
    // Clearing input fields after saving data
    document.getElementById('workoutName').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('date').value = '';
    // Refreshing the displayed entries
    displayEntry();  
}

// Function to display entries stored in localStorage
function displayEntry() {
    // Retrieving stored data from localStorage or initializing an empty array if not present
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    let detailsHTML = ''; // Variable to store HTML content for displaying entries
    // Iterating over stored data to generate HTML for each entry
    storedData.forEach((out, index) => {
        detailsHTML += `<div class="detail-box">
                            <button class="delete-button" onclick="removeEntry(${index})">-</button>
                            <p>Workout Name: ${out.workoutName}</p>
                            <p>Sets: ${out.sets}</p>
                            <p>Reps: ${out.reps}</p>
                            <p>Weight: ${out.weight} kg</p>
                            <p>Date: ${out.date}</p>
                        </div>`;
    });
    // Setting innerHTML of an element with id "ele" to display entry details
    document.getElementById("ele").innerHTML = detailsHTML;
}

// Function to navigate back in browser history
function goBack() {
    window.history.back();
}

// Function called when the window is fully loaded to display existing entries
window.onload = function() {
    displayEntry();
};
