var chatContainer, textInput, form;

function initialize() {
  chatContainer = document.getElementById("chat-container");
  textInput = document.getElementById("text");
  form = document.getElementById("form");
  form.addEventListener("submit", sendMessage);
  var button = document.getElementsByClassName("btn");
  button[0].addEventListener("click", toggleDisplay);
}

function toggleDisplay() {//Cambiar de invisible a visible
  if (chatContainer.style.display == 'block' && textInput.style.display == 'block') {
    textInput.style.display = 'none';
    chatContainer.style.display = 'none';
    chatContainer.style.height = '0px';
  } else {
    textInput.style.display = 'block';
    chatContainer.style.display = 'block';
    textInput.focus();
    animate();
  } 
}

function animate() {
  var height = 0;
  var interval = setInterval(function() {
    if (height < 300) {
      height++;
      chatContainer.style.height = height + 'px';
    } else {
      clearInterval(interval);
    }
  }, 5);
}

function sendMessage(e) {
  e.preventDefault();
  var today = new Date().toLocaleString();
  if (textInput.value != "") {
    var message = textInput.value;
    var username = "Javier Zabala";
    createDiv(today, username, message);
  }
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function createDiv(date, username, message) {
  var element = document.createElement("div");
  element.className = "messages";
  element.innerHTML = '<div class="datetime">' + date + '</div>';
  element.innerHTML += '<div class="username">' + username + '</div>';
  element.innerHTML += '<div class="message">' + message + '</div>';
  chatContainer.appendChild(element);
  textInput.value = "";
}

window.addEventListener("load", initialize);