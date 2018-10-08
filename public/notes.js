var notesContainer, noteInput;

function initialize() {
  notesContainer = document.getElementById("notes");
  noteInput = document.getElementById("note");
  noteInput.addEventListener("keydown", enter);
  var addButton = document.getElementById("add");
  addButton.addEventListener("click", addNote);
}

function enter(e) {
  if (e.keyCode == 13) {
    addNote();
  }
}

function addNote() {
  if (noteInput.value != "") {
    var message = noteInput.value;
    var today = new Date().toLocaleString();
    createNote(message, today);
  }
}

function createNote(message, datetime) {
  var element = document.createElement("div");
  element.className = "note";
  element.innerHTML = '<div class="icon"><i class="far fa-check-circle fa-2x"><i></div>';
  element.innerHTML += '<div class="text">' + message + '</div>';
  element.innerHTML += '<div class="datetime">' + datetime + '</div>';
  element.innerHTML += '<div class="delete"><i class="fas fa-minus-circle fa-2x"><i></div>';
  notesContainer.insertBefore(element, notesContainer.firstChild);//Inserting at the beginning
  noteInput.value = "";
  noteInput.focus();
  addListener();
}

function addListener() {
  var iconDiv = document.getElementsByClassName("icon");
  var deleteDiv = document.getElementsByClassName("delete");
  iconDiv[0].addEventListener("click", changeState);//Adding click event to the complete icon
  deleteDiv[0].addEventListener("click", removeChild);//Adding click event to the delete icon
}

function changeState(e) {
  var element = e.currentTarget;
  if (element.style.color == 'red') {
    element.style.color = 'green';
  } else {
    element.style.color = 'red';
  }
}

function removeChild(e) {
  var element = e.currentTarget;
  var parent = element.parentNode.parentNode;//Getting the main parent
  parent.removeChild(element.parentNode);//Deleting child
}

window.addEventListener("load", initialize);