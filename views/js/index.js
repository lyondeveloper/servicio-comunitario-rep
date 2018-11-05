//Global variables
var form;

//Initializing variables
function intialize() {
  var element = document.querySelector('body');
  element.style.height = window.innerHeight + 'px';
  form = document.getElementById('form');
  form.addEventListener('submit', sendForm);

  setTimeout(function() {
    var element = document.getElementById('modal');
    element.style.display = 'none';
    var element = document.getElementById('form');
    element.style.display = 'block';
  }, 2000);

  var token = localStorage.getItem('Authorization');
  if (token) {
    window.location.replace('/home');
  }
}

//Sending ajax request to send form data
function sendForm(e) {
  e.preventDefault();
  var url = '/api/users/login';
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      var responseObject = JSON.parse(req.responseText);
      var expirationDate = new Date(new Date().getTime() + (responseObject.expiresIn * 1));
      localStorage.setItem('Authorization', responseObject.token);
      localStorage.setItem('expirationDate', expirationDate);
      window.location.replace('/home');

    }

    if (this.readyState == 4 && this.status == 404) {

      var error = document.getElementById('error');
      var responseObject = JSON.parse(req.responseText);
      
      if (responseObject.message === '(User) or Password are incorrect') {
        error.innerHTML = 'Usuario incorrecto';
      }

      if (responseObject.message === 'User or (password) are incorrect') {
        error.innerHTML = 'Contraseña incorrecta';
      }

    }

  };

  var keys = ['email', 'password'];
  var encodedURI = [];
  for (key in keys) {
    encodedURI.push(encodeURIComponent(keys[key]) + '=' + encodeURIComponent(document.querySelector("input[name='" + keys[key] + "']").value));
  }
  var data = encodedURI.join('&');

  req.open('POST', url, true);//Preparing req
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.send(data);
}

window.addEventListener('load', intialize);