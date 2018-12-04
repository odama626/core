const regex = {
  tel: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
}

function TelephoneNumber(value) {
  return regex.tel.test(value);
}

function EmailAddress(value) {
  return regex.email.test(value);
}

function NotEmpty(value) {
  return value && value.length;
}

export default {
  TelephoneNumber,
  EmailAddress,
  NotEmpty
}