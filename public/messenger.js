var chatContainer, textInput, form, user, contactContainer;

function initialize() {
  chatContainer = document.getElementById("messages");
  textInput = document.getElementById("text");
  form = document.getElementById("form");
  form.addEventListener("submit", sendMessage);
  /*user = "Javier Zabala";
  var interval = setInterval(function() {//Genera dialogos aleatorios
    user = "AI";
    var today = new Date().toLocaleString();
    var index = Math.round(Math.random() * (9 - 1) + 1);
    var dialogs = ["Keloke", "Habla klaro", "Ablame", "xd", "Jajaja", "wiiii", "u.u", "e.e", ":D", "D:"];
    var message = dialogs[index];
    createDiv(today, message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  },5000);*/

  /*contactContainer = document.getElementById("contact-list");
  var interval = setInterval(function() {//Genera usuarios aleatorios
    var index = Math.round(Math.random() * 4);
    var users = ["Javier Zabala", "Jesús Rincón", "Andonis Ayala", "Andrés Bocaranda", "José Reyes"];
    user = users[index];
    createContact(user);
    contactContainer.scrollTop = contactContainer.scrollHeight;
  },5000);*/
}

function sendMessage(e) {
  user = "Javier Zabala";
  e.preventDefault();
  var today = new Date().toLocaleString();
  if (textInput.value != "") {
    var message = textInput.value;
    createDiv(today, message);
  }
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function createDiv(date, message) {
  var element = document.createElement("div");
  element.className = "message";
  element.innerHTML = '<div class="text">' + message + '<div class="datetime">' + date + '</div></div>';
  chatContainer.appendChild(element);
  if (user == 'Javier Zabala') {
    element.style.textAlign = 'right';
    textInput.value = "";
  } else {
    element.style.textAlign = 'left';
  }
}

function createContact(username) {
  var element = document.createElement("div");
  var img = document.createElement("img");
  img.src = "images/avatar.png";//Asignando una imagen al elemento
  element.className = "contact";
  element.appendChild(img);//Agrega una imagen al reciencreado div
  element.innerHTML += '<a href="#">' + username + '</a>';
  contactContainer.appendChild(element);//Agrega el div al elemento container
}

window.addEventListener("load", initialize);