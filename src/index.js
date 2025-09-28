import './cssReset.css';
import './styles.css';

// US Zip Codes: \d{5}(?:-\d{4})
const codes = {
  us: {
    regex: '\\d{5}(?:-\\d{4})?$',
    error: 'US Zip Codes must match these patterns : 12345 or 12345-1234',
  },
  nl: {
    regex: '[0-9]{4}\\s[A-Z]{2}$',
    error: 'Dutch Postal Codes must match this pattern: 1234 AB',
  },
  ca: {
    regex: '([A-Z]{1}\\d[A-Z]{1})\\s([A-Z]{1}\\d[A-Z]{1})$',
    error: 'Canadian Postal Codes must match this pattern: A1A A1A',
  },
};

const form = document.querySelector('form');
const email = document.getElementById('email');
const countrySelect = document.getElementById('country');
const postalCode = document.getElementById('postal-code');
const passwd = document.getElementById('passwd');
const confirmPasswd = document.getElementById('confirm-passwd');
const errorSpan = document.querySelector('.errorDisplay');

email.addEventListener('input', (event) => {
  let error;
  if (email.validity.typeMismatch) {
    email.setCustomValidity(
      'E-Mails must match this pattern: name@example.com'
    );
    error = 'E-Mails must match this pattern: name@example.com';
  } else {
    email.setCustomValidity('');
    error = '';
  }
  reportError(error);
});

countrySelect.addEventListener('change', (event) => {
  postalCode.value = '';
});

postalCode.addEventListener('input', (event) => {
  const currCountry = countrySelect.value;
  const regex = new RegExp(codes[currCountry].regex, '');
  const err = codes[currCountry].error;
  let error;

  if (!regex.test(postalCode.value)) {
    postalCode.setCustomValidity(err);
    error = err;
  } else {
    postalCode.setCustomValidity('');
    error = '';
  }

  reportError(error);
});

passwd.addEventListener('input', (event) => {
  const hasCapital = /[A-Z]/.test(passwd.value);
  const hasDigit = /[0-9]/.test(passwd.value);
  let error;

  if (!(hasDigit && hasCapital)) {
    passwd.setCustomValidity(
      'Password must contain at least a digit and a capital letter.'
    );
    error = 'Password must contain at least a digit and a capital letter.';
  } else {
    passwd.setCustomValidity('');
    error = '';
  }

  reportError(error);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let error;

  if (confirmPasswd.value !== passwd.value) {
    confirmPasswd.setCustomValidity("Passwords don't match!");
    error = "Passwords don't match!";
  } else {
    confirmPasswd.setCustomValidity('');
    error = '';
  }

  if (form.checkValidity()) {
    console.log('All good!');
  } else {
    reportError(error);
  }
});

const reportError = (error) => {
  if (error !== '') {
    errorSpan.style.opacity = 1;
    errorSpan.textContent = error;
    errorSpan.classList.add('err');
  } else {
    errorSpan.style.opacity = 0;
  }
};
