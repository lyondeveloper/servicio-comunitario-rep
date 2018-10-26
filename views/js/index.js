var form;
//Initializing variables
function intialize() {
  var element = document.querySelector("body");
  element.style.height = window.innerHeight + "px";
  form = document.getElementById('form');
  form.addEventListener('submit', sendForm);

  setTimeout(function() {
    var element = document.getElementById('modal');
    element.style.display = 'none';
    var element = document.getElementById('form');
    element.style.display = 'block';
  }, 2000);

  var token = localStorage.getItem('token');
  if (token) {
    window.location.assign('/home');
  }
}

//Sending ajax request to send form data
function sendForm(e) {
  e.preventDefault();
  var url = '/api/login';
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(req.responseText);
      var expirationDate = new Date(new Date().getTime() + (responseObject.expiresIn * 1));
      localStorage.setItem('token', responseObject.token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('user', responseObject.userLogged.name);
      window.location.replace('/home');

      //Sending ajax request to update online status
      var req2 = new XMLHttpRequest();
      responseObject.userLogged.online = true;
      req2.open('PUT', '/api/users/' + responseObject.userLogged._id, true);//Preparing req
      req2.setRequestHeader('Content-type', 'application/json');
      req2.setRequestHeader('token', localStorage.getItem('token'));
      req2.send(JSON.stringify(responseObject.userLogged));
    }

    if (this.readyState == 4 && this.status == 400) {
      var error = document.getElementById('error');
      error.innerHTML = 'Usuario o contraseña incorrectos';
    }

    if (this.readyState == 4 && this.status == 401) {
      var error = document.getElementById('error');
      error.innerHTML = 'El usuario introducido ya ha iniciado sesión';
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

//Validating form
function validate() {
  if (user.value == "") {
    user.setCustomValidity("Ingrese su email.");
  } else {
    user.setCustomValidity("");
  }
  if (pass.value == "") {
    pass.setCustomValidity("Ingrese su contraseña.");
  } else {
    pass.setCustomValidity("");
  }
}

window.addEventListener("load", intialize);