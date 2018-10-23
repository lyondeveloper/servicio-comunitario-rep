
var form;

function intialize() {
  var element = document.querySelector("body");
  element.style.height = window.innerHeight + "px";
  var login = document.getElementById("login");
  login.addEventListener("click", sendForm);
  form = document.getElementsByClassName("form")[0];

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
    var element = document.getElementsByClassName('form')[0];
    element.style.display = 'block';
  }, 2000);
}

function sendForm() {
  var formData = new FormData(form);
  ajax('/api/login', formData);
}

function ajax(url, data) {//Loads content of another html document
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.replace('/home.html');
      var responseObject = JSON.parse(req.responseText);
      localStorage.setItem('token', responseObject.token);
    }
  };
  req.open("POST", url, true);//Preparing req
  req.send(data);//Refers to the body
}

function validate() {
  if (user.value == "") {
    user.setCustomValidity("Ingrese su usuario.");
  } else {
    user.setCustomValidity("");
  }
  if (pass.value == "") {
    pass.setCustomValidity("Ingrese su constraseña.");
  } else {
    pass.setCustomValidity("");
  }
}

window.addEventListener("load", intialize);