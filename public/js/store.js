function initialize() {
  var nextButtons = document.getElementsByClassName('next');
  var prevButtons = document.getElementsByClassName('prev');
  for (var i = 0; i < nextButtons.length; i++) {
    var button = nextButtons[i];
    button.addEventListener("click", nextButton);
  }
  for (var i = 0; i < prevButtons.length; i++) {
    var button = prevButtons[i];
    button.addEventListener("click", prevButton);
  }
}

function nextButton(e) {
  var current = e.target.parentNode.parentNode;
  var next = current.nextElementSibling;

  next.style.display = 'block';
  current.style.display = 'none';
  document.documentElement.scrollTop = 130;
}

function prevButton(e) {
  var current = e.target.parentNode.parentNode;
  var prev = current.previousElementSibling;

  prev.style.display = 'block';
  current.style.display = 'none';
  document.documentElement.scrollTop = 130;
}

window.addEventListener("load", initialize);