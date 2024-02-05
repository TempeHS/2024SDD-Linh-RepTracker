function toggleInputFields() {
    const inputFields = document.querySelector('.input-fields');
    inputFields.style.display = inputFields.style.display === 'none' ? 'block' : 'none';
}

function removeEntry(index) {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('workoutData', JSON.stringify(storedData));
    displayEntry();
}


function addWorkout() {
    const workoutNameInput = document.getElementById('workoutName');
    const workoutList = document.getElementById('workoutsList');

    if (workoutNameInput.value.trim() !== '') {
        const workoutItem = document.createElement('div');
        workoutItem.innerHTML = `<p>${workoutNameInput.value}</p>
                        <button class="go-back-button" onclick="removeWorkoutItem(this)">Remove</button>`;
        workoutList.appendChild(workoutItem);
        workoutNameInput.value = '';
    }
}


function removeWorkoutItem(button) {
    const workoutItem = button.parentNode;
    workoutItem.parentNode.removeChild(workoutItem);
}

function saveData() {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    const day = document.getElementById('day').value;
    const typeOfWorkout = document.getElementById('typeOfWorkout').value;

    
    const workouts = [];
    const workoutList = document.getElementById('workoutsList').getElementsByTagName('p');
    for (let i = 0; i < workoutList.length; i++) {
        workouts.push(workoutList[i].innerText);
    }

    storedData.push({
        day: day,
        typeOfWorkout: typeOfWorkout,
        workouts: workouts,
    });

    localStorage.setItem('workoutData', JSON.stringify(storedData));
    document.getElementById('day').value = 'Monday'; 
    document.getElementById('typeOfWorkout').value = ''; 
    document.getElementById('workoutsList').innerHTML = ''; 
    displayEntry();  
}

function displayEntry() {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    let detailsHTML = '';
    storedData.forEach((out, index) => {
        detailsHTML += `<div class="detail-box">
                            <button class="delete-button" onclick="removeEntry(${index})">-</button>
                            <p>Day: ${out.day}</p>
                            <p>Type of Workout: ${out.typeOfWorkout}</p>`;
        
        if (out.workouts && out.workouts.length > 0) {
            detailsHTML += `<p>Workouts:</p><ul>`;
            out.workouts.forEach(workout => {
                detailsHTML += `<li>${workout}</li>`;
            });
            detailsHTML += `</ul>`;
        }

        detailsHTML += `</div>`;
    });
    document.getElementById("ele").innerHTML = detailsHTML;
}

function goBack() {
    window.history.back();
}

window.onload = function() {
    displayEntry();
};
