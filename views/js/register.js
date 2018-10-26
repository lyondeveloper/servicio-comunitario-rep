//Initializing variables
function intialize() {
  var element = document.querySelector("body");
  element.style.height = window.innerHeight + "px";
  var form = document.getElementById("form");
  form.addEventListener("submit", sendForm);

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
    var element = document.getElementsByClassName('form')[0];
    element.style.display = 'block';
  }, 2000);
}

//Sending ajax request
function sendForm(e) {
  e.preventDefault();
  var url = '/api/users/create';
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.assign('/');
    }
  };

  var keys = ['name', 'email', 'password', 'identification', 'birthday'];
  var encodedURI = [];
  for (key in keys) {
    encodedURI.push(encodeURIComponent(keys[key]) + '=' + encodeURIComponent(document.querySelector("input[name='" + keys[key] + "']").value));
  }
  var data = encodedURI.join('&');

  req.open('POST', url, true);//Preparing req
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.send(data);
}

window.addEventListener("load", intialize);