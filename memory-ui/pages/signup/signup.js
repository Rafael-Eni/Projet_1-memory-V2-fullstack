import { register } from "../../shared/user-service.js";

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmationInput = document.getElementById("confirmation");

const isValidErrorIndicator = "/ressources/error.svg";
const isValidCheckIndicator = "/ressources/check.svg";

let validationGroup = {
  username: false,
  email: false,
  password: false,
  confirm: false,
};

usernameInput.addEventListener("input", checkUsername);
emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
confirmationInput.addEventListener("input", checkConfirmation);

/* ========================================= */
/* ========== VALIDATE EACH INPUT ========== */
/* ========================================= */
function checkUsername() {
  const errorMessage = document.querySelector(".username-error");
  const indicator = document.querySelector(".username-img-indicator");
  const value = usernameInput.value;

  indicator.style.display = "block";

  if (value.length < 3) {
    errorMessage.innerText =
      "Choisissez un nom contendant au moins 3 caractères";
    indicator.src = isValidErrorIndicator;
    validationGroup.username = false;
  } else {
    errorMessage.innerText = "";
    indicator.src = isValidCheckIndicator;
    validationGroup.username = true;
  }
}

function checkEmail() {
  const errorMessage = document.querySelector(".email-error");
  const indicator = document.querySelector(".email-img-indicator");
  const value = emailInput.value;

  indicator.style.display = "block";

  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    errorMessage.innerText = "Renseignez un email valide";
    indicator.src = isValidErrorIndicator;
    validationGroup.email = false;
  } else {
    errorMessage.innerText = "";
    indicator.src = isValidCheckIndicator;
    validationGroup.email = true;
  }
}

function checkPassword() {
  const value = passwordInput.value;
  const indicator = document.querySelector(".password-img-indicator");
  let strenghValue = 0;

  let indicatorBar = [
    document.querySelector(".weak"),
    document.querySelector(".medium"),
    document.querySelector(".strong"),
  ];

  indicatorBar.forEach((indicator) => {
    indicator.style.display = "none";
  });

  indicator.style.display = "block";

  if (value.length >= 6) {
    strenghValue++;

    if (value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      strenghValue++;
    }

    if (value.match(/[0-9]/) && value.length >= 9) {
      strenghValue++;
    }
  }

  if (strenghValue === 3) {
    validationGroup.password = true;
    indicator.src = isValidCheckIndicator;
  } else {
    validationGroup.password = false;
    indicator.src = isValidErrorIndicator;
  }

  for (let i = 0; i < strenghValue; i++) {
    indicatorBar[i].style.display = "block";
  }
}

function checkConfirmation() {
  const errorMessage = document.querySelector(".confirm-error");
  const indicator = document.querySelector(".confirmation-img-indicator");

  const passwordValue = passwordInput.value;
  const confirmValue = confirmationInput.value;

  indicator.style.display = "block";

  if (!validationGroup.password) {
    errorMessage.innerText = "Renseignez d'abord un mot de passe valide";
    indicator.src = isValidErrorIndicator;
    validationGroup.confirm = false;
  } else {
    if (confirmValue !== passwordValue) {
      errorMessage.innerText = "Renseignez deux mot de passe identique";
      indicator.src = isValidErrorIndicator;
      validationGroup.confirm = false;
    } else {
      errorMessage.innerText = "";
      indicator.src = isValidCheckIndicator;
      validationGroup.confirm = true;
    }
  }
}

/* =================================== */
/* ========== HANDLE SUBMIT ========== */
/* =================================== */
function isFormValid() {
  let isFormValid = true;
  const formValidationValues = Object.values(validationGroup);

  formValidationValues.forEach((value) => {
    if (!value) isFormValid = false;
  });
  return isFormValid;
}

function checkAllInputs() {
  checkUsername();
  checkEmail();
  checkPassword();
  checkConfirmation();
}

/* =================================== */
/* ========== CANCEL BUTTON ========== */
/* =================================== */

const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", handleCancel);

function handleCancel() {
  location.replace("/index.html");
}

/* ======================================= */
/* ========== PERSIST USER DATA ========== */
/* ======================================= */
const signupForm = document.querySelector("form");
signupForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  checkAllInputs();

  if (isFormValid()) {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const newUser = {
      username,
      email,
      password,
      scores: [],
      preferences: {
        name: "Legumes",
        size: "4*3",
      },
    };

    register(newUser)
      .then(() => {
        alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
        location.replace("/pages/signin/signin.html");
      })
      .catch(() => {
        alert("An account already exist with provided email");
      });
  } else {
    signupForm.classList.add("form-error");
    setTimeout(() => {
      signupForm.classList.remove("form-error");
    }, 400);
  }
}
