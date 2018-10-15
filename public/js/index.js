function intialize() {
  var element = document.querySelector("body");
  element.style.height = window.innerHeight + "px";
  var user = document.getElementById("user");
  var pass = document.getElementById("pass");
  user.addEventListener("input", validate);
  pass.addEventListener("input", validate);
  validate();

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
    var element = document.getElementsByClassName('form')[0];
    element.style.display = 'block';
  }, 2000);
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