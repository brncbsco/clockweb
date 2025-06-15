let is12hour = false;
let IntervalId; // moved to global

  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");


function toggle() {
  clearInterval(IntervalId);
  if (is12hour === false) {
    twelve();
    IntervalId = setInterval(twelve, 1000);
    is12hour = true;
    document.getElementById("ampmbutton").textContent = "24 hour Format";
  } else {
    twentyfour();
    IntervalId = setInterval(twentyfour, 1000);
    is12hour = false;
    document.getElementById("ampmbutton").textContent = "12 hour Format";
  }
}

function showclock() {
  document.getElementById("clocksection").style.display = "block";
  document.getElementById("stopwatchsection").style.display = "none";
  document.getElementById("alarmsection").style.display = "none";
}

showclock();

function showsection(section) {
  document.getElementById("clocksection").style.display = "none";
  document.getElementById("stopwatchsection").style.display = "none";
  document.getElementById("alarmsection").style.display = "none";

  document.getElementById(section + "section").style.display = "block";
}

function twentyfour() {
    let now = new Date();
let hours = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");
let seconds = now.getSeconds().toString().padStart(2, "0");


  // Update main clock
  let mainHours = document.querySelector("#clocksection .hours");
  let mainMinutes = document.querySelector("#clocksection .minutes");
  let mainSeconds = document.querySelector("#clocksection .seconds");

  mainHours.textContent = hours;
  mainMinutes.textContent = minutes;
  mainSeconds.textContent = seconds;

  // Update alarm clock
  let alarmHours = document.querySelector("#alarmsection .hours");
  let alarmMinutes = document.querySelector("#alarmsection .minutes");
  let alarmSeconds = document.querySelector("#alarmsection .seconds");

  if (alarmHours && alarmMinutes && alarmSeconds) {
    alarmHours.textContent = hours;
    alarmMinutes.textContent = minutes;
    alarmSeconds.textContent = seconds;
  }

  document.getElementById("AMPM").style.display = "none";
}
twentyfour();
IntervalId = setInterval(twentyfour, 1000);


// NORMAL TIME 12h
function twelve() {
  document.getElementById("AMPM").style.display = "block";

  let hoursph = document.querySelector("#clocksection .hours");
  let minutesph = document.querySelector("#clocksection .minutes");
  let secondsph = document.querySelector("#clocksection .seconds");
  let indicator = document.getElementById("AMPM");

  let now1 = new Date();
  let hours = now1.getHours();
  let minutes = now1.getMinutes();
  let seconds = now1.getSeconds();
  let ampm = "PM";

  if (hours >= 12) {
    ampm = "PM";
    indicator.textContent = "PM";
  } else {
    ampm = "AM";
    indicator.textContent = "AM";
  }

  if (ampm === "PM") {
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
  }

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  hoursph.textContent = hours;
  minutesph.textContent = minutes;
  secondsph.textContent = seconds;
}

// STOPWATCH
let sw = true;
let intervalid;

let swseconds = 0;
let swminutes = 0;
let swhours = 0;

let hoursph = document.getElementById("swhours");
let minutesph = document.getElementById("swminutes");
let secondsph = document.getElementById("swseconds");

function swtoggle() {
  if (sw === true) {
    intervalid = setInterval(start, 1000);
    document.querySelector(".stopwatchbutton").textContent = "Stop";
    sw = false;
  } else {
    clearInterval(intervalid);
    document.querySelector(".stopwatchbutton").textContent = "Start";
    sw = true;
  }
}

function start() {
  swseconds++;

  if (swseconds === 60) {
    swseconds = 0;
    swminutes++;
  }

  if (swminutes === 60) {
    swminutes = 0;
    swhours++;
  }

  hoursph.textContent = swhours.toString().padStart(2, "0");
  minutesph.textContent = swminutes.toString().padStart(2, "0");
  secondsph.textContent = swseconds.toString().padStart(2, "0");
}

function restart() {
  clearInterval(intervalid);
  swseconds = 0;
  swminutes = 0;
  swhours = 0;

  sw = true;
  document.querySelector(".stopwatchbutton").textContent = "Start";

  hoursph.textContent = "00";
  secondsph.textContent = "00";
  minutesph.textContent = "00";
}

// ALARM INPUT FORMATTING
let placeholder = document.getElementById("placeholderMask");
let input = document.getElementById("alarmInput");

input.addEventListener("input", () => {

  

  let raw = input.value.replace(/\D/g, "");
  raw = raw.slice(-4);

  raw = raw.padStart(4, "0");

  const formatted = raw.slice(0, 2) + ":" + raw.slice(2)

  placeholder.textContent = formatted;

  input.value = input.value.slice(0,4);
  input.value = input.value.replace(/\D/g, "");

});

function lockcursor(){

    const length = input.value.length;
    input.setSelectionRange(length,length);

}


    input.addEventListener("click", lockcursor);
    input.addEventListener("input", lockcursor);
    input.addEventListener("focus", lockcursor);



 

function close1() {
  document.querySelector(".alarmcontainer .close").addEventListener("click", () => {
    document.querySelector(".alarmcontainer").style.display = "none";

  });

  document.querySelector("#stopalarmcontainer .close").addEventListener("click", () => {
    document.querySelector("#stopalarmcontainer").style.display = "none";
    
  });
}


let alarminterval;

const audio = new Audio("alarm.mp3");
audio.loop = true;
let audioplaying = false;



function startAlarmChecking() {
  // Start interval ONCE
  if (alarminterval) clearInterval(alarminterval); // Avoid multiple intervals
  setAlarm();
  alarminterval = setInterval(setAlarm, 1000);
}

function addAlarm() {
        input.value = "";
  placeholder.textContent = "00:00";

  document.querySelector(".alarmcontainer").style.display = "flex";
      if (alarminterval){
      alert("You already have an ongoing alarm!")
      return;
    }

}

function setAlarm() {
    if (input.value.length < 3){
    alert("Please fill out complete alarm time.");
    clearInterval(alarminterval);
    alarminterval = null;
        return;}

      document.querySelector(".alarmcontainer").style.display = "none";


            let now = new Date(); 
    let hours = now.getHours();
    let minutes = now.getMinutes();


    //reference
    let inputstr = String(input.value.slice(0,2) + ":" + input.value.slice(2));

    let timetype = String(document.getElementById("type").value);
    console.log(timetype);

    console.log(inputstr);

    //conversion
    let type;
    if (hours >=12){
        type = "PM"
        hours = hours%12;
    }

    if (hours === 12) {
        hours = 12;
    }

    else {
        hours = hours;
        if(hours == 0){
            hours = 12;
            type = "AM"
        }        
    }

let timeconv = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');


    if (timeconv === inputstr){
        if (type === timetype){
            
            audio.play();
            audioplaying = true;
            clearInterval(alarminterval);
        }
        else{
            return;
        }
    }

    else{
        return;
    }

    }

function stopalarmdiagram(){
  
  if (alarminterval){
    document.getElementById("stopalarmcontainer").style.display = "flex";
  }

  else{
    alert("No alarm to stop! Please set an alarm.")
  }
}

function goback(){
  document.getElementById("stopalarmcontainer").style.display ="none";
}

function stopalarm(){
  if (audioplaying === true){
    audio.pause();
    audio.currentTime = 0;
    audioplaying = false;
  }
  clearInterval(alarminterval);
  alarminterval = null;
  document.getElementById("stopalarmcontainer").style.display ="none";
}

close1();