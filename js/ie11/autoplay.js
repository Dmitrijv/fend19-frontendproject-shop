var freezeArea = document.querySelector(".p-grid-1");
var banners = document.querySelectorAll(".banner");
var spans = document.querySelector(".tab").querySelectorAll("span");
var prevArrow = document.querySelector(".prev");
var nextArrow = document.querySelector(".next");
var activeDot = document.querySelector(".on");
var bannersLength = banners.length;

// initial setting, display first image and first dot
// if there are more than one image, let's auto-play
if (bannersLength > 1) {
  banners[0].style.opacity = "1";
  spans[0].className = "on";
} else {// clearInerval
  spans[0].style.display = "none";
  prevArrow.style.display = "none";
  nextArrow.style.display = "none";
  clearInterval(timer);
}

var num = 0;
for (var i = 0; i < bannersLength; i++) {
  spans[i].index = i;
  spans[i].onclick = function () { //click dot to display relevant img
    for (var j = 0; j < bannersLength; j++) {
      num = this.index;
      spans[j].className = "";
      banners[j].style.opacity = "0";
    }
    spans[num].className = "on";
    banners[num].style.opacity = "1";
  }
  nextArrow.onclick = function () { //click to show next img
    for (var j = 0; j < bannersLength; j++) {
      if (spans[j].className == "on") {
        spans[j].className = "";
        banners[j].style.opacity = "0";
        j++;
        num++;
        if (j > bannersLength -1) {
          j = 0;
        }
        spans[j].className = "on";
        banners[j].style.opacity = "1";
      }
    }
  }

  prevArrow.onclick = function () { //click to show previous img
    for (var j = 0; j < bannersLength; j++) {
      if (spans[j].className == "on") {
        spans[j].className = "";
        banners[j].style.opacity = "0";
        j--;
        num--;
        if (j < 0) {
          j = bannersLength -1;
        }
        spans[j].className = "on";
        banners[j].style.opacity = "1";
      }
    }
  }
}

function Time() {
  num++;
  if (num < bannersLength) {
    for (var j = 0; j < bannersLength; j++) {
      spans[j].className = "";
      banners[j].style.opacity = "0";
    }
    spans[num].className = "on";
    banners[num].style.opacity = "1";
  } else {
    num = -1;
  }
}
clearInterval(timer);
var timer = setInterval("Time()", 3000); 

freezeArea.onmouseover = function () {
  clearInterval(timer);
};
freezeArea.onmouseout = function () {
  clearInterval(timer);
  timer = setInterval("Time()", 3000);
};