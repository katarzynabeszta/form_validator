const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const popup = document.querySelector('.popup');
const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const closeBtn = document.querySelector('.close');
const formInputs = [username, password, password2, email];

const checkForm = (inputs) => {
  inputs.forEach((input) => {
    if (input.value === '') {
      showError(input, input.placeholder);
    } else {
      clearError(input);
    }
  });
};

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMessage = formBox.querySelector('.error-text');
  formBox.classList.add('error');
  errorMessage.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove('error');
};

const checkLength = (input, minLength) => {
  if (input.value.length < minLength) {
    const lengthErrorMessage = `${input.placeholder} should contain min ${minLength} characters`;
    showError(input, lengthErrorMessage);
  }
};

const checkPassword = (passwordOne, passwordTwo) => {
  if (passwordOne.value !== passwordTwo.value) {
    showError(passwordTwo, 'Passwords do not match');
  }
};

const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email);
  } else {
    showError(email, 'Email is incorrect');
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll('.form-box');
  const errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains('error')) {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    popup.classList.add('show-popup');
  }
};

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  checkForm(formInputs);
  checkLength(username, 5);
  checkLength(password, 8);
  checkPassword(password, password2);
  checkEmail(email);
  checkErrors();
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();

  formInputs.forEach((el) => {
    el.value = '';
    clearError(el);
  });
});
