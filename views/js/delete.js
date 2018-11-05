//Importing neccesary modules
import { verifyToken, deleteToken } from './token.js';
import { verifySession, interval } from './session.js';
import { showRecords } from './records.js';

//Initializing variables
function initialize() {

  var logout = document.getElementById('logout', deleteToken);
  logout.addEventListener('click', deleteToken);

  var search = document.getElementById('searchBtn');
  search.addEventListener('click', showRecords);

  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
  }, 2000);

  verifyToken();
  verifySession();
}

window.addEventListener('load', initialize);