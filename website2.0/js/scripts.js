//Mainly inspired by: https://googlecreativelab.github.io/coder-projects/projects/digital_clock/
//Found the time of each location by calculating their difference with GMT

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function displayTime() {
  var currentTime = new Date();
  var hours = addZero(currentTime.getUTCHours());
  var minutes = addZero(currentTime.getUTCMinutes());
  var seconds = addZero(currentTime.getUTCSeconds());
  var meridiem = "AM";
  if (hours >= 12 ) {
    meridiem = "PM";
  }
  var clockDiv = document.getElementsByClassName("clocks");
  for (var i = 0; i < clockDiv.length; i++) {
    var timezone = "Seattle, USA\n";
    if (clockDiv[i].id == "torontoTime") {
      timezone = "Toronto, Canada\n";
      hours = currentTime.getUTCHours() - 4;
      if (hours < 0) {
        hours = 24 + hours;
      }
    }
    else if (clockDiv[i].id == "parisTime") {
      timezone = "Paris, France\n";
      hours = currentTime.getUTCHours() + 1;
      if (hours >= 24) {
        hours -= 24;
      }
    }
    else if (clockDiv[i].id == "seattleTime") {
      hours = currentTime.getUTCHours() - 7;
      if (hours < 0) {
        hours = 24 + hours;
      }
    }
    else if (clockDiv[i].id == "beijingTime") {
      timezone = "Beijing, China\n";
      hours = currentTime.getUTCHours() + 8;
      if (hours >= 24) {
        hours -= 24;
      }
    }
    clockDiv[i].innerText = timezone + hours + ":" + minutes + ":" + seconds + " " + meridiem;
  }
}

function attachHandlers() {
  let docTitle = document.title;

  if (docTitle == "Image Gallery") {
    let slider2 = document.getElementById("images");
    slider2.style.color = "black";
    slider2.style.backgroundColor = "white";
  }
  else if (docTitle == "Home") {
    let slider2 = document.getElementById("home");
    slider2.style.color = "black";
    slider2.style.backgroundColor = "white";
  }
  else if (docTitle == "Google Calendar API" || docTitle == "Digital Clock Wall" || docTitle == "RSA Cryptography") {
    let slider2 = document.getElementById("projects");
    slider2.style.color = "black";
    slider2.style.backgroundColor = "white";
    let slider3 = document.getElementById("projectsInner");
    slider3.style.color = "black";
    slider3.style.backgroundColor = "white";
  }
  displayTime();
  setInterval(displayTime, 1000);
}

window.addEventListener("load", attachHandlers);
