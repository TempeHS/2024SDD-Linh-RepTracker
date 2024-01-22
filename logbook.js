function fun() {
    localStorage.setItem('name',
        document.getElementById('name').value)
    localStorage.setItem('password',
        document.getElementById('password').value);
}
function fun2() {
    document.getElementById("ele").innerHTML = '<h3>name: '
        + localStorage.getItem("name") + '</h3><h3>Passward: ' +
        localStorage.getItem('password') + '</h3>';
}