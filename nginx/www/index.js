'use strict';

if (location.protocol !== 'https:' & location.host === 'whatsapp-helper.appspot.com') {
  location.href = 'https://whatsapp-helper.appspot.com/';
}

var countrycode, currentElement;

setTimeout(
  function() {
    document.getElementById('countrycode').focus();
    document.onkeyup = function(e) {
      if (document.activeElement.id !== 'countrycode') {
        if (e.keyCode === 13) {
          doStuff();
        }
      }
    }
  },
  50
);

function doFilter(e) {
  var div, filter, i, input, txtValue;
  e = e || window.event;
  input = document.getElementById('countrycode');
  refreshList();
  if (e.keyCode === 27) {
    input.value = '';
    filter = input.value.toUpperCase();
    refreshList();
    return;
  } else if (e.keyCode === 40) {
    if (countrycode === null) {
      currentElement = document.querySelector('.dropdown-content div div');
      if (currentElement.style.display !== '') {
        while (currentElement.nextElementSibling !== null) {
          currentElement = currentElement.nextElementSibling;
          if (currentElement.style.display === '') {
            break;
          }
        }
      }
    } else if (currentElement.nextElementSibling !== null) {
      currentElement.style.backgroundColor = '#f1f1f1';
      currentElement.parentNode.scrollBy(0, 15);
      while (currentElement.nextElementSibling !== null) {
        currentElement = currentElement.nextElementSibling;
        if (currentElement.style.display === '') {
          break;
        }
      }
    }
  } else if (e.keyCode === 38) {
    if (countrycode === null) {
      currentElement = document.querySelector('.dropdown-content div div');
      if (currentElement.style.display !== '') {
        while (currentElement.previousElementSibling !== null) {
          currentElement = currentElement.previousElementSibling;
          if (currentElement.style.display === '') {
            break;
          }
        }
      }
    } else if (currentElement.previousElementSibling !== null) {
      currentElement.style.backgroundColor = '#f1f1f1';
      currentElement.parentNode.scrollBy(0, -15);
      while (currentElement.previousElementSibling !== null) {
        currentElement = currentElement.previousElementSibling;
        if (currentElement.style.display === '') {
          break;
        }
      }
    }
  } else {
    countrycode = null;
    if (currentElement !== undefined && currentElement !== null) {
      currentElement.style.backgroundColor = "#f1f1f1";
    }
    return;
  }
  countrycode = currentElement.getAttributeNode('data-countrycode').value;
  currentElement.style.backgroundColor = '#d1d1d1';
} // function doFilter

function doSelect(element) {
  var div, i;
  countrycode = element.getAttributeNode('data-countrycode').value;
  div = document.querySelectorAll('.dropdown-content div div');
  for (i = 0; i < div.length; i++) {
    div[i].style.backgroundColor = '#f1f1f1';
  }
  element.style.backgroundColor = '#d1d1d1';
} // function doSelect

function doStuff() {
  window.open(
    'https://wa.me/' + countrycode + document.querySelector('input#prefix').value +
    document.querySelector('input#subscriber').value,
    '_blank'
  );
} // function doStuff

function refreshList() {
  var div, filter, i, input, txtValue;
  input = document.getElementById('countrycode');
  filter = input.value.toUpperCase();
  div = document.querySelectorAll('.dropdown-content div div');
  for (i = 0; i < div.length; i++) {
    txtValue = div[i].textContent || div[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div[i].style.display = '';
    } else {
      div[i].style.display = 'none';
    }
  }
} // function refreshList