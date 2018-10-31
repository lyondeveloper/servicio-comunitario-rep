//Importing neccesary modules
import { nextButton, prevButton } from './fade.js';
import { verifyToken, deleteToken } from './token.js';
import { getData } from './ajax.js';

//Initializing variables
function initialize() {
  var nextButtons = document.getElementsByClassName('next');
  var prevButtons = document.getElementsByClassName('prev');

  for (var i = 0; i < nextButtons.length; i++) {
    var button = nextButtons[i];
    button.addEventListener('click', nextButton);
  }

  for (var i = 0; i < prevButtons.length; i++) {
    var button = prevButtons[i];
    button.addEventListener('click', prevButton);
  }

  var logout = document.getElementById('logout', deleteToken);
  logout.addEventListener('click', deleteToken);

  var print = document.getElementById('main');
  print.addEventListener('submit', printDocument);

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
  }, 2000);

  getData();
  verifyToken();
}

//Prints the document
function printDocument(e) {
  e.preventDefault();
  var printWindow = window.open('', '', 'height=600,width=800');
  printWindow.location.replace('/print');
  printWindow.document.close();
}

window.addEventListener('load', initialize);