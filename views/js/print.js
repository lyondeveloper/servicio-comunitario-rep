//Importing neccesary modules
import { getData } from './ajax.js';

//Initializing variables
function initialize() {
  document.querySelector('title').innerText = sessionStorage.getItem('name');
  getData(sessionStorage.getItem('name'));

  setTimeout(() => {
    window.print();
  }, 500);
}

window.addEventListener('load', initialize);