//Importing neccesary modules
import { nextButton, prevButton } from './fade.js';
import { verifyToken, deleteToken } from './token.js';
import { getData } from './ajax.js';

//Initializing variables
function initialize() {
  var nextButtons = document.getElementsByClassName("next");
  var prevButtons = document.getElementsByClassName("prev");

  for (var i = 0; i < nextButtons.length; i++) {
    var button = nextButtons[i];
    button.addEventListener("click", nextButton);
  }

  for (var i = 0; i < prevButtons.length; i++) {
    var button = prevButtons[i];
    button.addEventListener("click", prevButton);
  }

  var logout = document.getElementById('logout', deleteToken);
  logout.addEventListener('click', deleteToken);

  var search = document.getElementById("search");
  search.addEventListener("submit", getData);

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
  }, 2000);

  verifyToken();
}

window.addEventListener("load", initialize);