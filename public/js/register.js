var form;

function intialize() {
  var element = document.querySelector("body");
  element.style.height = window.innerHeight + "px";
  form = document.getElementsByClassName("form")[0];
  var register = document.getElementById("register");
  register.addEventListener("click", sendForm);
  /*var user = document.getElementById("user");
  var pass = document.getElementById("pass");
  user.addEventListener("input", validate);
  pass.addEventListener("input", validate);
  validate();*/

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
    var element = document.getElementsByClassName('form')[0];
    element.style.display = 'block';
  }, 2000);
}

function sendForm() {
  var formData = new FormData(form);
  ajax('/api/users/create', formData);
}

function ajax(url, data) {//Loads content of another html document
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //No response
      window.location.assign('/login.html');
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