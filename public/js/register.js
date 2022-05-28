/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-use-before-define */
/* eslint-disable import/newline-after-import */
/* eslint-disable object-curly-newline */
import { clearErrorsArr, checkInput, errorsArr } from './modules/validation.js';
import { BASE_URL } from '../js/modules/fetch.js';

const formEl = document.getElementById('registerForm');
const errorMsg = document.querySelectorAll('.error-msg');
const successMsgEl = document.querySelector('.success-msg');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('clicked');

  const formData = {
    fullName: formEl.elements.fullName.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repeatPassword: formEl.elements.repeatPassword.value.trim(),
  };

  clearErrors();

  // TODO front end validation

  checkInput(formData.fullName, 'fullName', ['required', 'minLength-2', 'fullName']);
  checkInput(formData.email, 'email', ['required', 'minLength-4', 'email']);
  checkInput(formData.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  checkInput(formData.repeatPassword, 'repeatPassword', ['required', 'minLength-5', 'maxLength-20']);

  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  // 2. palytingi ar sutampa slaptazodziai
  if (formData.password !== formData.repeatPassword) {
    handleError('nesutampa slaptazodziai');
    return;
  }
  registerFetch(formData.fullName, formData.email, formData.password);
});

// HANDLE ERROR //

function handleError(msg) {
  errorMsg.textContent = '';
  if (typeof msg === 'string') {
    errorMsg.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}
async function registerFetch(fullName, email, password) {
  console.log('registerFetch===', registerFetch);
  const registerObj = { fullName, email, password };
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  // const dataInJs = await resp.json();
  if (resp.status === 201) {
    successMsg('register success');
    // window.location.href = 'login.html';
  } else {
    handleError(await resp.json());
  }
}

function successMsg(msg) {
  successMsgEl.textContent = '';
  if (typeof msg === 'string') {
    successMsgEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((sObj) => {
      const elWithSuccess = formEl.elements[sObj.field];
      elWithSuccess.classList.add('success-msg');
      elWithSuccess.nextElementSibling.textContent = sObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsg.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
