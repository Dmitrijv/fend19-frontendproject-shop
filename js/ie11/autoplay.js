var oBody = document.getElementsByTagName("body")[0];
var aBanner = document.getElementsByClassName("banner");
var aSpan = document.getElementsByClassName("tab")[0].getElementsByTagName("span");
var oNext = document.getElementsByClassName("next")[0];
var Oprev = document.getElementsByClassName("prev")[0];
var Oon = document.getElementsByClassName("on")[0];
aBanner[0].style.opacity = "1";
aSpan[0].className = "on";

var num = 0;
for (var i = 0; i < aSpan.length; i++) {
  aSpan[i].index = i;
  aSpan[i].onclick = function () {
    for (var j = 0; j < aSpan.length; j++) {
      num = this.index;
      aSpan[j].className = "";
      aBanner[j].style.opacity = "0";
    }
    aSpan[num].className = "on";
    aBanner[num].style.opacity = "1";
  }
  oNext.onclick = function () {
    for (var j = 0; j < aSpan.length; j++) {
      if (aSpan[j].className == "on") {
        aSpan[j].className = "";
        aBanner[j].style.opacity = "0";
        j++;
        num++;
        if (j > 4) {
          j = 0;
        }
        aSpan[j].className = "on";
        aBanner[j].style.opacity = "1";

      }
    }
  }

  Oprev.onclick = function () {
    for (var j = 0; j < aSpan.length; j++) {
      if (aSpan[j].className == "on") {
        aSpan[j].className = "";
        aBanner[j].style.opacity = "0";
        j--;
        num--;
        if (j < 0) {
          j = 4;
        }
        aSpan[j].className = "on";
        aBanner[j].style.opacity = "1";

      }
    }
  }
}

function Time() {
  num++;
  if (num < 5) {
    for (var j = 0; j < aSpan.length; j++) {
      aSpan[j].className = "";
      aBanner[j].style.opacity = "0";
    }
    aSpan[num].className = "on";
    aBanner[num].style.opacity = "1";
  } else {
    num = -1;
  }
}
clearInterval(timer);
var timer = setInterval("Time()", 2000);

oBody.onmouseover = function () {
  clearInterval(timer);
};
oBody.onmouseout = function () {
  clearInterval(timer);
  timer = setInterval("Time()", 2000);
};