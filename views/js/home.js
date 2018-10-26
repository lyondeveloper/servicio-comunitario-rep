//Importing neccesary modules
import { verifyToken, deleteToken } from './token.js';

//Initializing variables
function initialize() {
  var logout = document.getElementById('logout', deleteToken);
  logout.addEventListener('click', deleteToken);

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
  }, 2000);

  verifyToken();
}

window.addEventListener('load', initialize);