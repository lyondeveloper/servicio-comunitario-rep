//Global variable
var id;

//Ajax request to send form data
function sendForm(e, url, method) {
  e.preventDefault();
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.assign('/home');
    }
  };

  //Student fields
  var one = ['name', 'identification', 'sex', 'birthday', 'birthdayPlace', 'municipality', 'country'];
  var two = ['age', 'weight', 'height', 'shirtSize', 'pantSize', 'shoeSize', 'direction'];
  var three = ['phoneNumber', 'impedimentToSports', 'alergicTo', 'parentName', 'parentSex', 'parentIdentification'];
  var four = ['parentBirthday', 'parentCompany', 'parentCivilState', 'parentOcupation', 'parentDirection'];
  var five = ['parentPhoneNumber1', 'parentPhoneNumber2', 'representName', 'representSex'];
  var six = ['representID', 'representBirthday', 'representAge', 'representCivilState', 'representOcupation'];
  var seven = ['representCompany', 'representDirection', 'representPhoneNumber1', 'representPhoneNumber2'];
  var keys = one.concat(two, three, four, five, six, seven);
  var encodedURI = [];

  //Filling an array using pair-value format
  for (var key in keys) {
    encodedURI.push(encodeURIComponent(keys[key]) + '=' + encodeURIComponent(document.querySelector("input[name='" + keys[key] + "']").value));
  }

  //Filling the array with booleans
  var booleans = ['liveWithParents', 'liveWithKid'];
  for (var boolean in booleans) {
    if (document.querySelector("input[name='" + booleans[boolean] + "']").value === 'Si') {
      encodedURI.push(encodeURIComponent(booleans[boolean]) + '=true');
    } else {
      encodedURI.push(encodeURIComponent(booleans[boolean]) + '=false');
    }
  }

  //Creating data from array
  var data = encodedURI.join('&');

  req.open(method, url, true);//Preparing req
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.setRequestHeader('token', localStorage.getItem('token'));
  req.send(data);
}

//Ajax request to get data from server
function getData(e) {
  e.preventDefault();
  var url = '/api/register/getByName/' + document.getElementById('searchByName').value;
  var req = new XMLHttpRequest();

  //HTML Form input names
  var student1 = ['name', 'identification', 'sex', 'birthdayPlace', 'municipality', 'country'];
  var student2 = ['age', 'weight', 'height', 'shirtSize', 'pantSize', 'shoeSize', 'direction'];
  var student3 = ['phoneNumber', 'impedimentToSports', 'alergicTo'];
  var parent1 = ['parentName', 'parentSex', 'parentIdentification', 'parentCompany'];
  var parent2 = ['parentCivilState', 'parentOcupation', 'parentDirection', 'parentPhoneNumber1', 'parentPhoneNumber2'];
  var repre1 = ['representName', 'representSex', 'representID', 'representAge'];
  var repre2 = ['representCivilState', 'representOcupation', 'representCompany', 'representDirection', 'representPhoneNumber1', 'representPhoneNumber2'];
  var studentKeys = student1.concat(student2, student3);
  var parentKeys = parent1.concat(parent2);
  var repreKeys = repre1.concat(repre2);

  //JSON response property names
  var parent3 = ['name', 'sex', 'identification', 'company', 'civilState', 'ocupation'];
  var parent4 = ['direction', 'phoneNumber1', 'phoneNumber2'];
  var repre3 = ['name', 'sex', 'identification', 'age', 'civilState', 'ocupation'];
  var repre4 = ['company', 'direction', 'phoneNumber1', 'phoneNumber2'];
  var parentKeysDB = parent3.concat(parent4);
  var repreKeysDB = repre3.concat(repre4);

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      show(document.getElementById('main'));
      show(document.getElementById('progressbar'));

      var responseObject = JSON.parse(req.responseText);
      var student = responseObject.student;
      var parent = student.parent;
      var repre = student.represent;
      id = student._id;

      //Student birthday
      var birthdayStr = new Date(student.birthday).toUTCString();
      var birthday = formatDate(birthdayStr);

      //Parent birthday
      var parentBirthdayStr = new Date(parent.birthday).toUTCString();
      var parentBirthday = formatDate(parentBirthdayStr);

      //Repre birthday
      var repreBirthdayStr = new Date(repre.birthday).toUTCString();
      var repreBirthday = formatDate(repreBirthdayStr);

      //Filling all fields
      for (var studentKey in studentKeys) {
        document.querySelector("input[name='" + studentKeys[studentKey] + "']").value = student[studentKeys[studentKey]];
      }
      for (var parentKey in parentKeys) {
        document.querySelector("input[name='" + parentKeys[parentKey] + "']").value = parent[parentKeysDB[parentKey]];
      }
      for (var repreKey in repreKeys) {
        document.querySelector("input[name='" + repreKeys[repreKey] + "']").value = repre[repreKeysDB[repreKey]];
      }

      //Handling booleans
      if (student.liveWithParents === true) {
        document.querySelector("input[name='liveWithParents']").value = 'Si';
      } else {
        document.querySelector("input[name='liveWithParents']").value = 'No';
      }
      if (parent.liveWithKid === true) {
        document.querySelector("input[name='liveWithKid']").value = 'Si';
      } else {
        document.querySelector("input[name='liveWithKid']").value = 'No';
      }

      //Handling date inputs
      if (student.birthday) {
        document.querySelector("input[name='birthday']").value = birthday;
      }
      if (parent.birthday) {
        document.querySelector("input[name='parentBirthday']").value = parentBirthday;
      }
      if (repre.birthday) {
        document.querySelector("input[name='representBirthday']").value = repreBirthday;
      }
    }
    if (this.readyState == 4 && this.status == 401) {
      var inputs = document.querySelectorAll('input[name]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
      }
    }
  }
  req.open('GET', url, true);//Preparing req
  req.setRequestHeader('token', localStorage.getItem('token'));
  req.send(null);
}

//Sending ajax request to delete record
function deleteRecord(e) {
  e.preventDefault();
  var url = '/api/register/delete/' + id;
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.assign('/home');
    }
  };

  req.open('DELETE', url, true);//Preparing req
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.setRequestHeader('token', localStorage.getItem('token'));
  req.send(null);
}

//Show form
function show(element) {
  var show = setInterval(function() {
    if (element.style.opacity < 1) {
      element.style.opacity -= '-0.1';
    } else {
      clearInterval(show);
    }
  }, 50);
}

//Format date to yyy-mm-dd
function formatDate(date) {
  var d = new Date(date);
  var month = '' + (d.getUTCMonth() + 1);
  var day = '' + d.getUTCDate();
  var year = d.getUTCFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

//Exporting module
export {sendForm, getData, deleteRecord, id};