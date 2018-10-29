var animating;

//Fade effect
function nextButton(e) {
  var current = e.target.parentNode.parentNode;
  var next = current.nextElementSibling;

  //Add active class using index of next
  var active = document.querySelectorAll('.progressbar li');
  active[indexInParent(next)].classList.add('active');

  //Flag to avoid multi-click glitches
  if (animating) return false;
  animating = true;

  //Hide current
  current.style.opacity = '1';
  var hide = setInterval(function() {
    if (current.style.opacity > 0) {
      current.style.opacity -= '0.1';
    } else {
      clearInterval(hide);
      current.style.display = 'none';
      next.style.display = 'grid';
      next.style.opacity = '0';
      //Show next
      var show = setInterval(function() {
        if (next.style.opacity < 1) {
          next.style.opacity -= '-0.1';
        } else {
          clearInterval(show);
          animating = false;
        }
      }, 50);
    }
  }, 50);
  document.documentElement.scrollTop = 165;
}

//Fade effect
function prevButton(e) {
  var current = e.target.parentNode.parentNode;
  var prev = current.previousElementSibling;

  //Add active class using index of current
  var active = document.querySelectorAll('.progressbar li');
  active[indexInParent(current)].classList.remove('active');

  //Flag to avoid multi-click glitches
  if (animating) return false;
  animating = true;

  //Hide current
  current.style.opacity = '1';
  var hide = setInterval(function() {
    if (current.style.opacity > 0) {
      current.style.opacity -= '0.1';
    } else {
      clearInterval(hide);
      current.style.display = 'none';
      prev.style.display = 'grid';
      prev.style.opacity = '0';
      //Show prev
      var show = setInterval(function() {
        if (prev.style.opacity < 1) {
          prev.style.opacity -= '-0.1';
        } else {
          clearInterval(show);
          animating = false;
        }
      }, 50);
    }
  }, 50);
  document.documentElement.scrollTop = 165;
}

//Returns index in parent
function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i=0; i<children.length; i++) {
       if (children[i]==node) return num;
       if (children[i].nodeType==1) num++;
  }
  return -1;
}

//Exporting module
export {nextButton, prevButton};