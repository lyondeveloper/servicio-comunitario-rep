//Global variables
var notesContainer;

//Shows all records
function showRecords() {
  notesContainer = document.getElementById('notes');
  notesContainer.innerHTML = '';
  
  if (document.getElementById('searchByName').value === '') {

    var url = '/api/register/getAll';
    
  } else {

    var url = '/api/register/getAllByName/' + document.getElementById('searchByName').value;

  }

  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      var responseObject = JSON.parse(req.responseText);
      var students = responseObject.students;
      for (var i = 0; i < students.length; i++) {

        createNote(students[i].name);

      }

    }

  }

  req.open('GET', url, true);
  req.setRequestHeader('token', localStorage.getItem('token'));
  req.send(null);
}

//Creates div for a given name and inserts it at the beginning
function createNote(name) {
  var element = document.createElement('div');
  element.className = 'note';
  element.innerHTML += '<div class="text">' + name + '</div>';
  notesContainer.insertBefore(element, notesContainer.firstChild);//Inserting at the beginning
  addListener();
}

//Adds listener to the recently added div
function addListener() {
  var iconDiv = document.getElementsByClassName('note');
  iconDiv[0].addEventListener('click', storeData);
}

//On click store data on localStorage and redirect
function storeData(e) {
  var element = e.currentTarget;
  sessionStorage.setItem('name', element.innerText);
  window.location.href = window.location.href + 'Student';
}

//Exporting module
export {showRecords};