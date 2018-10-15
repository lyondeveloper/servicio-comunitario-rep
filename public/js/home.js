function initialize() {
  setTimeout(function() {
    var element = document.getElementsByClassName('modal')[0];
    element.style.display = 'none';
  }, 2000);
}

window.addEventListener('load', initialize);