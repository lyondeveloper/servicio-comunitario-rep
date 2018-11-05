//Global variable
var interval = 2500;

//Verify sessions
function verifySession() {

  var url = '/verifySession';
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
        
    }

    if (this.readyState == 4 && this.status == 401) {

      localStorage.removeItem('Authorization');
      localStorage.removeItem('expirationDate');
      window.location.replace('/');

    }

  }

  req.open('GET', url, true);//Preparing req
  req.setRequestHeader('Authorization', localStorage.getItem('Authorization'));
  req.send(null);

}

//Exporting module
export {verifySession, interval};