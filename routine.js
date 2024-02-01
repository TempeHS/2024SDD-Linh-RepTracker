function toggleInputFields() {
    const inputFields = document.querySelector('.input-fields');
    inputFields.style.display = inputFields.style.display === 'none' ? 'block' : 'none';
}

function removeEntry(index) {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('workoutData', JSON.stringify(storedData));
    fun2();
}

function fun() {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    storedData.push({
        workoutName: document.getElementById('workoutType').value,
        sets: document.getElementById('day').value,
        reps: document.getElementById('reps').value,
        weight: document.getElementById('weight').value,
        date: document.getElementById('date').value
    });
    localStorage.setItem('workoutData', JSON.stringify(storedData));
    document.getElementById('workoutType').value = '';
    document.getElementById('day').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('date').value = '';
    fun2();  
}

function fun2() {
    let storedData = JSON.parse(localStorage.getItem('workoutData')) || [];
    let detailsHTML = '';
    storedData.forEach((out, index) => {
        detailsHTML += `<div class="detail-box">
                            <button class="delete-button" onclick="removeEntry(${index})">-</button>
                            <p>Workout Type: ${out.workoutType}</p>
                            <p>Day: ${out.day}</p>
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
    fun2();
};