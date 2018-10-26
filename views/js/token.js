//Verify token expiration date
function verifyToken() {
  var token = localStorage.getItem('token');
  if (!token) {
    window.location.assign('/');
  } else {
    var expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate < new Date()) {
      window.location.assign('/');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
    } else {
      var expiresIn = expirationDate.getTime() - new Date().getTime();
      logOut(expiresIn);
    }
  }
}

//Forcing logout after time runs out
function logOut(timeout) {
  setTimeout(function() {
    window.location.assign('/');
    deleteToken();
  }, timeout);
}

//Deletes token
function deleteToken() {

  //Sending ajax request to update online status
  var url = '/api/users/getByName/' + localStorage.getItem('user')
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      var responseObject = JSON.parse(req.responseText);

      //Sending ajax request to update online status
      var req2 = new XMLHttpRequest();
      responseObject.user.online = false;

      req2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //Empty storage
          localStorage.removeItem('token');
          localStorage.removeItem('expirationDate');
          localStorage.removeItem('user');
          window.location.assign('/');
        }
      }

      req2.open('PUT', '/api/users/' + responseObject.user._id, true);//Preparing req
      req2.setRequestHeader('Content-type', 'application/json');
      req2.setRequestHeader('token', localStorage.getItem('token'));
      req2.send(JSON.stringify(responseObject.user));

    }

  }

  req.open('GET', url, true);//Preparing req
  req.setRequestHeader('Content-type', 'application/json');
  req.setRequestHeader('token', localStorage.getItem('token'));
  req.send(null);
}

//Exporting module
export {verifyToken, deleteToken};