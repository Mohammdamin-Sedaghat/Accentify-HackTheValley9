
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    window.location.href = 'index.html';
    // if (username === "user" && password === "web_dev") {
    //     window.location.href = 'index';
    //     location.reload();
    // } else {
    //     loginErrorMsg.style.opacity = 1;
    // }
})