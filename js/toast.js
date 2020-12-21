
window.addEventListener('load', () => {
    const created = JSON.parse(sessionStorage.getItem('createdUser'));
    if(created) {
        displayToastMessage(created.details, created.status);
        sessionStorage.removeItem('createdUser');
    }
});

function displayToastMessage(msg, status) {
    let snack = document.createElement("div");
    snack.innerText = msg;
    snack.className = "snackbar show " + status;

    document.getElementById("toasts").append(snack);
    setTimeout(function(){ snack.parentNode.removeChild(snack) }, 3000);
}