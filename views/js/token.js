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
      localStorage.removeItem('id');
      sessionStorage.removeItem('name');
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

  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('id');
  sessionStorage.removeItem('name');
  window.location.assign('/');
  
}

//Exporting module
export {verifyToken, deleteToken};