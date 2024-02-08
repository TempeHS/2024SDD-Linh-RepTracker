function toggleInputFields() {
    const inputFields = document.querySelector('.input-fields');
    inputFields.style.display = inputFields.style.display === 'none' ? 'block' : 'none';
}

function removeEntry(index) {
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('logbookData', JSON.stringify(storedData));
    displayEntry();
}

function saveData() {
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    storedData.push({
        workoutName: document.getElementById('workoutName').value,
        sets: document.getElementById('sets').value,
        reps: document.getElementById('reps').value,
        weight: document.getElementById('weight').value,
        date: document.getElementById('date').value
    });
    localStorage.setItem('logbookData', JSON.stringify(storedData));
    document.getElementById('workoutName').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('date').value = '';
    displayEntry();  
}

function displayEntry() {
    let storedData = JSON.parse(localStorage.getItem('logbookData')) || [];
    let detailsHTML = '';
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
    document.getElementById("ele").innerHTML = detailsHTML;
}

function goBack() {
    window.history.back();
}

window.onload = function() {
    displayEntry();
};
