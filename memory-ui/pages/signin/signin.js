import { authenticate } from "../../shared/user-service.js";

const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

/* =================================== */
/* ========== HANDLE SUBMIT ========== */
/* =================================== */
form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const credentials = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  authenticate(credentials)
    .then((user) => {
      saveUserInLocalStorage(user);
      location.replace("/pages/profile/profile.html");
    })
    .catch(() => {
      form.classList.add("form-error");
      setTimeout(() => {
        form.classList.remove("form-error");
      }, 400);
    });
}

function saveUserInLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/* =================================== */
/* ========== CANCEL BUTTON ========== */
/* =================================== */
const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", handleCancel);

function handleCancel() {
  location.replace("/index.html");
}
