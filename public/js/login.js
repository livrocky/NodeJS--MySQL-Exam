/* eslint-disable no-use-before-define */
/* eslint-disable import/no-useless-path-segments */
import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';
import { BASE_URL } from '../js/modules/fetch.js';

const loginFormEl = document.querySelector('.login-form');
const errorMsgEl = document.querySelectorAll('.error-msg');
const successMsgEl = document.querySelector('.success-msg');

loginFormEl.addEventListener('submit', async (e) => {
  console.log('loginFormEl===', loginFormEl);
  e.preventDefault();
  const loginObj = {
    email: loginFormEl.elements.email.value.trim(),
    password: loginFormEl.elements.password.value.trim(),
  };
  clearErrorsArr();
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-20']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    errorMsgEl.textContent = '';
    successMsg('Logged in successfully!');
    const { token } = dataInJs;
    localStorage.setItem('articleUserToken', token);
    window.location.href = 'groups.html';
    clearErrors();
  } else {
    errorMsgEl.textContent = '';
    console.log('Login failed!');
    handleError(dataInJs);
  }
});

function handleError(msg) {
  errorMsgEl.textContent = '';
  if (typeof msg === 'string') {
    errorMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = loginFormEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

function successMsg(msg) {
  successMsgEl.textContent = '';
  if (typeof msg === 'string') {
    successMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((sObj) => {
      const elWithSuccess = loginFormEl.elements[sObj.field];
      elWithSuccess.classList.add('success-msg');
      elWithSuccess.nextElementSibling.textContent = sObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsgEl.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
