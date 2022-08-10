//Import Firestore capabilities
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';

import { getFirestore, collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC2WudRqxHx7wbyhRmkDZfocu10Wc3pua0",
  authDomain: "upbuild-dev.firebaseapp.com",
  projectId: "upbuild-dev",
  storageBucket: "upbuild-dev.appspot.com",
  messagingSenderId: "800726031263",
  appId: "1:800726031263:web:5f96faede02a6c888b7baa",
  measurementId: "G-KQKGTCPRYW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


//Date Definitions

const user = 'sbahr96'; //Will change once authentication is set up
const now = new Date();
let year = now.getFullYear();
if ((now.getMonth() == 0) && (now.getDate() <= now.getDay())) {//No Sunday yet in the year
  year = year - 1;
};
let month = now.getMonth() + 1;
if (now.getDate() <= now.getDay()) {//No Sunday yet in the month
  if (now.getMonth() == 0) {//January
    month = 12;
  } else {
    month = month - 1;
  }
};
const week = getCurrentWeek();


//Log In

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('buttonLogInConfirm').addEventListener('click', () => {
    const logins = LogIn(db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function LogIn(db) {
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const week = getCurrentWeek();

  const goalRefUltimate = doc(db, 'ultimateGoals', user);
  const goalSnapUltimate = await getDoc(goalRefUltimate);

  const goalRefAnnual = doc(db, 'annualGoals', user + '-' + year + '-1');
  const goalSnapAnnual = await getDoc(goalRefAnnual);

  const goalRefAnnual2 = doc(db, 'annualGoals', user + '-' + year + '-2');
  const goalSnapAnnual2 = await getDoc(goalRefAnnual2);

  const goalRefAnnual3 = doc(db, 'annualGoals', user + '-' + year + '-3');
  const goalSnapAnnual3 = await getDoc(goalRefAnnual3);

  const goalRefAnnual4 = doc(db, 'annualGoals', user + '-' + year + '-4');
  const goalSnapAnnual4 = await getDoc(goalRefAnnual4);

  const goalRefMonth = doc(db, 'monthGoals', user + '-' + year + '.' + month + '-1-1');
  const goalSnapMonth = await getDoc(goalRefMonth);

  const goalRefWeek = doc(db, 'weekGoals', user + '-' + year + '.' + month + '.' + week + '-1-1-1');
  const goalSnapWeek = await getDoc(goalRefWeek);

  if (!goalSnapUltimate.exists()) {//If the user does not have an Ultimate Goal
    document.getElementById('ultimateGoal').classList.add('active');
    document.getElementById('landing').classList.remove('active');
  } else if (!goalSnapAnnual.exists()) {//If the user does not have an Annual Goal for the current year
    document.getElementById('annual').classList.add('active');
    document.getElementById('annualQuote').innerHTML = goalSnapUltimate.data().ultimateGoal;
    document.getElementById('landing').classList.remove('active');
  } else if (!goalSnapMonth.exists()) {//If the user does not have a Monthly Goal for the current month
    document.getElementById('month1').classList.add('active');
    document.getElementById('monthQuote-1').innerHTML = goalSnapAnnual.data().name + ' - ' + goalSnapAnnual.data().desc;
    document.getElementById('landing').classList.remove('active');
  } else if (!goalSnapWeek.exists()) {//If the user does not have a Weekly Goal for the current week
    document.getElementById('week1-1').classList.add('active');
    document.getElementById('weekQuote1-1').innerHTML = goalSnapMonth.data().name + ' - ' + goalSnapMonth.data().desc;
  } else {//Go to the Existing User Page
    document.getElementById('todayDate').innerHTML = monthName[+now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    document.getElementById('existingMain').classList.add('active');
    document.getElementById('landing').classList.remove('active');
    document.getElementById('annualGoalExist1').innerHTML = goalSnapAnnual.data().name;
    if (goalSnapAnnual2.exists()) {
      document.getElementById('annualExist2').classList.add('visible');
      document.getElementById('annualGoalExist2').innerHTML = goalSnapAnnual2.data().name;
    };
    if (goalSnapAnnual3.exists()) {
      document.getElementById('annualExist3').classList.add('visible');
      document.getElementById('annualGoalExist3').innerHTML = goalSnapAnnual3.data().name;
    };
    if (goalSnapAnnual4.exists()) {
      document.getElementById('annualExist4').classList.add('visible');
      document.getElementById('annualGoalExist4').innerHTML = goalSnapAnnual4.data().name;
    };
    // return monthName[+now.getMonth()];
  };

};


//****Show the Monthly Goals for Appropriate Annual Goal on Existing Main****

const annualSelected = document.querySelectorAll('[data-exist-annual]');

annualSelected.forEach(button => {
  button.addEventListener('click', () => {
    let y = button.dataset.existAnnual;
    const goals = changeAnnualGoalScreen(y)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function changeAnnualGoalScreen(y) {
  let annualID = "annualGoalExist" + y;
  const month1ref = doc(db, 'monthGoals', user + '-' + year + '.' + month + '-' + y + '-1');
  const month1Snap = await getDoc(month1ref);
  document.getElementById("annualGoalText").innerHTML = document.getElementById(annualID).innerHTML;
  document.getElementById("annualGoalText").title = y; //This saves the year value for the changeMonthGoalScreen function
  document.getElementById("annualText").classList.add('visible');
  document.getElementById("annualGoalsExist").classList.remove('visible');
  document.getElementById("monthGoalsExist").classList.add('visible');
  document.getElementById("monthExist1").classList.add('visible');
  document.getElementById("monthGoalExist1").innerHTML = month1Snap.data().name;

  const month2Ref = doc(db, 'monthGoals', user + '-' + year + '.' + month + '-' + y + '-2');
  const month2Snap = await getDoc(month2Ref);
  if (month2Snap.exists()) {
    document.getElementById("monthExist2").classList.add('visible');
    document.getElementById("monthGoalExist2").innerHTML = month2Snap.data().name;
  };
  const month3Ref = doc(db, 'monthGoals', user + '-' + year + '.' + month + '-' + y + '-3');
  const month3Snap = await getDoc(month3Ref);
  if (month3Snap.exists()) {
    document.getElementById("monthExist3").classList.add('visible');
    document.getElementById("monthGoalExist3").innerHTML = month3Snap.data().name;
  };
};

//Return to the Annual Display

const annualReturn = document.querySelectorAll('[data-return-annual]');

annualReturn.forEach(button => {
  button.addEventListener('click', () => {
    returnAnnual()
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function returnAnnual() {
  //Remove Weekly view
  document.getElementById("monthText").classList.remove('visible');
  document.getElementById("weekGoalsExist").classList.remove('visible');
  document.getElementById("weekExist1").classList.remove('visible');
  document.getElementById("weekExist2").classList.remove('visible');

  //Remove Monthly view
  document.getElementById("annualText").classList.remove('visible');
  document.getElementById("annualGoalsExist").classList.add('visible');
  document.getElementById("monthGoalsExist").classList.remove('visible');
  document.getElementById("monthExist1").classList.remove('visible');
  document.getElementById("monthExist2").classList.remove('visible');
  document.getElementById("monthExist3").classList.remove('visible');
};


//****Show the Weekly Goals for the Appropriate Monthly Goal

const monthSelected = document.querySelectorAll('[data-exist-month]');

monthSelected.forEach(button => {
  button.addEventListener('click', () => {
    let m = button.dataset.existMonth;
    let y = document.getElementById("annualGoalText").title;
    const goals = changeMonthGoalScreen(y, m)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function changeMonthGoalScreen(y, m) {
  let ym = y + '-' + m;
  let monthID = "monthGoalExist" + m;
  const week1Ref = doc(db, 'weekGoals', user + '-' + year + '.' + month + '.' + week + '-' + ym + '-1');
  const week1Snap = await getDoc(week1Ref);
  const data1 = week1Snap.data();
  document.getElementById("monthGoalText").innerHTML = document.getElementById(monthID).innerHTML;
  document.getElementById("monthGoalText").title = y; //This saves the year value for the changeMonthGoalScreen function
  document.getElementById("monthText").classList.add('visible');
  document.getElementById("monthGoalsExist").classList.remove('visible');
  document.getElementById("weekGoalsExist").classList.add('visible');

  document.getElementById("weekExist1").classList.add('visible');
  document.getElementById("weekGoalName1").innerHTML = data1.name;
  document.getElementById("weekGoalDesc1").innerHTML = data1.desc;
  if (data1.sunday) {//If this weekly goal requires follow-up from Sunday
    document.getElementById("Sunday1").classList.remove('not-today');
    document.getElementById("SundayExist1").classList.remove('not-today');
    document.getElementById("SundaySlider1").classList.remove('not-today');
    if (data1.sunday_complete) {
      document.getElementById("SundayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Sunday follow-up
    document.getElementById("Sunday1").classList.add('not-today');
    document.getElementById("SundayExist1").classList.add('not-today');
    document.getElementById("SundaySlider1").classList.add('not-today');
  };
  if (data1.monday) {//If this weekly goal requires follow-up from Monday
    document.getElementById("Monday1").classList.remove('not-today');
    document.getElementById("MondayExist1").classList.remove('not-today');
    document.getElementById("MondaySlider1").classList.remove('not-today');
    if (data1.monday_complete) {
      document.getElementById("MondayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Monday follow-up
    document.getElementById("Monday1").classList.add('not-today');
    document.getElementById("MondayExist1").classList.add('not-today');
    document.getElementById("MondaySlider1").classList.add('not-today');
  };
  if (data1.tuesday) {//If this weekly goal requires follow-up from Tuesday
    document.getElementById("Tuesday1").classList.remove('not-today');
    document.getElementById("TuesdayExist1").classList.remove('not-today');
    document.getElementById("TuesdaySlider1").classList.remove('not-today');
    if (data1.tuesday_complete) {
      document.getElementById("TuesdayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Tuesday follow-up
    document.getElementById("Tuesday1").classList.add('not-today');
    document.getElementById("TuesdayExist1").classList.add('not-today');
    document.getElementById("TuesdaySlider1").classList.add('not-today');
  };
  if (data1.wednesday) {//If this weekly goal requires follow-up from Wednesday
    document.getElementById("Wednesday1").classList.remove('not-today');
    document.getElementById("WednesdayExist1").classList.remove('not-today');
    document.getElementById("WednesdaySlider1").classList.remove('not-today');
    if (data1.wednesday_complete) {
      document.getElementById("WednesdayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Wednesday follow-up
    document.getElementById("Wednesday1").classList.add('not-today');
    document.getElementById("WednesdayExist1").classList.add('not-today');
    document.getElementById("WednesdaySlider1").classList.add('not-today');
  };
  if (data1.thursday) {//If this weekly goal requires follow-up from Thursday
    document.getElementById("Thursday1").classList.remove('not-today');
    document.getElementById("ThursdayExist1").classList.remove('not-today');
    document.getElementById("ThursdaySlider1").classList.remove('not-today');
    if (data1.thursday_complete) {
      document.getElementById("ThursdayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Thursday follow-up
    document.getElementById("Thursday1").classList.add('not-today');
    document.getElementById("ThursdayExist1").classList.add('not-today');
    document.getElementById("ThursdaySlider1").classList.add('not-today');
  };
  if (data1.friday) {//If this weekly goal requires follow-up from Friday
    document.getElementById("Friday1").classList.remove('not-today');
    document.getElementById("FridayExist1").classList.remove('not-today');
    document.getElementById("FridaySlider1").classList.remove('not-today');
    if (data1.friday_complete) {
      document.getElementById("FridayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Friday follow-up
    document.getElementById("Friday1").classList.add('not-today');
    document.getElementById("FridayExist1").classList.add('not-today');
    document.getElementById("FridaySlider1").classList.add('not-today');
  };
  if (data1.saturday) {//If this weekly goal requires follow-up from Saturday
    document.getElementById("Saturday1").classList.remove('not-today');
    document.getElementById("SaturdayExist1").classList.remove('not-today');
    document.getElementById("SaturdaySlider1").classList.remove('not-today');
    if (data1.saturday_complete) {
      document.getElementById("SaturdayComplete1").checked = true;
    };
  } else {//If this weekly goal does not require Saturday follow-up
    document.getElementById("Saturday1").classList.add('not-today');
    document.getElementById("SaturdayExist1").classList.add('not-today');
    document.getElementById("SaturdaySlider1").classList.add('not-today');
  };

  const week2Ref = doc(db, 'weekGoals', user + '-' + year + '.' + month + '.' + week + '-' + ym + '-2');
  const week2Snap = await getDoc(week2Ref);
  let data2 = week2Snap.data();
  if (week2Snap.exists()) {
    document.getElementById("weekExist2").classList.add('visible');
    document.getElementById("weekGoalName2").innerHTML = data2.name;
    document.getElementById("weekGoalDesc2").innerHTML = data2.desc;
    if (data2.sunday) {//If this weekly goal requires follow-up from Sunday
      document.getElementById("Sunday2").classList.remove('not-today');
      document.getElementById("SundayExist2").classList.remove('not-today');
      document.getElementById("SundaySlider2").classList.remove('not-today');
      if (data2.sunday_complete) {
        document.getElementById("SundayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Sunday follow-up
      document.getElementById("Sunday2").classList.add('not-today');
      document.getElementById("SundayExist2").classList.add('not-today');
      document.getElementById("SundaySlider2").classList.add('not-today');
    };
    if (data2.monday) {//If this weekly goal requires follow-up from Monday
      document.getElementById("Monday2").classList.remove('not-today');
      document.getElementById("MondayExist2").classList.remove('not-today');
      document.getElementById("MondaySlider2").classList.remove('not-today');
      if (data2.monday_complete) {
        document.getElementById("MondayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Monday follow-up
      document.getElementById("Monday2").classList.add('not-today');
      document.getElementById("MondayExist2").classList.add('not-today');
      document.getElementById("MondaySlider2").classList.add('not-today');
    };
    if (data2.tuesday) {//If this weekly goal requires follow-up from Tuesday
      document.getElementById("Tuesday2").classList.remove('not-today');
      document.getElementById("TuesdayExist2").classList.remove('not-today');
      document.getElementById("TuesdaySlider2").classList.remove('not-today');
      if (data2.tuesday_complete) {
        document.getElementById("TuesdayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Tuesday follow-up
      document.getElementById("Tuesday2").classList.add('not-today');
      document.getElementById("TuesdayExist2").classList.add('not-today');
      document.getElementById("TuesdaySlider2").classList.add('not-today');
    };
    if (data2.wednesday) {//If this weekly goal requires follow-up from Wednesday
      document.getElementById("Wednesday2").classList.remove('not-today');
      document.getElementById("WednesdayExist2").classList.remove('not-today');
      document.getElementById("WednesdaySlider2").classList.remove('not-today');
      if (data2.wednesday_complete) {
        document.getElementById("WednesdayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Wednesday follow-up
      document.getElementById("Wednesday2").classList.add('not-today');
      document.getElementById("WednesdayExist2").classList.add('not-today');
      document.getElementById("WednesdaySlider2").classList.add('not-today');
    };
    if (data2.thursday) {//If this weekly goal requires follow-up from Thursday
      document.getElementById("Thursday2").classList.remove('not-today');
      document.getElementById("ThursdayExist2").classList.remove('not-today');
      document.getElementById("ThursdaySlider2").classList.remove('not-today');
      if (data2.thursday_complete) {
        document.getElementById("ThursdayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Thursday follow-up
      document.getElementById("Thursday2").classList.add('not-today');
      document.getElementById("ThursdayExist2").classList.add('not-today');
      document.getElementById("ThursdaySlider2").classList.add('not-today');
    };
    if (data2.friday) {//If this weekly goal requires follow-up from Friday
      document.getElementById("Friday2").classList.remove('not-today');
      document.getElementById("FridayExist2").classList.remove('not-today');
      document.getElementById("FridaySlider2").classList.remove('not-today');
      if (data2.friday_complete) {
        document.getElementById("FridayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Friday follow-up
      document.getElementById("Friday2").classList.add('not-today');
      document.getElementById("FridayExist2").classList.add('not-today');
      document.getElementById("FridaySlider2").classList.add('not-today');
    };
    if (data2.saturday) {//If this weekly goal requires follow-up from Saturday
      document.getElementById("Saturday2").classList.remove('not-today');
      document.getElementById("SaturdayExist2").classList.remove('not-today');
      document.getElementById("SaturdaySlider2").classList.remove('not-today');
      if (data2.saturday_complete) {
        document.getElementById("SaturdayComplete2").checked = true;
      };
    } else {//If this weekly goal does not require Saturday follow-up
      document.getElementById("Saturday2").classList.add('not-today');
      document.getElementById("SaturdayExist2").classList.add('not-today');
      document.getElementById("SaturdaySlider2").classList.add('not-today');
    };
  };
};

//Return to monthly screen from the weekly screen

const monthReturn = document.querySelectorAll('[data-return-month]');

monthReturn.forEach(button => {
  button.addEventListener('click', () => {
    returnMonth()
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function returnMonth() {
  document.getElementById("monthText").classList.remove('visible');
  document.getElementById("monthGoalsExist").classList.add('visible');
  document.getElementById("weekGoalsExist").classList.remove('visible');
  document.getElementById("weekExist1").classList.remove('visible');
  document.getElementById("weekExist2").classList.remove('visible');
};


//****Update Weekly Goals****

const weekUpdates = document.querySelectorAll('[data-week-update]');

weekUpdates.forEach(slider => {
  slider.addEventListener('click', () => {
    let wd = slider.dataset.weekUpdate;
    let w = right(slider.id, 1);
    let on = slider.checked;
    updateWeeklyComplete(wd, w, on)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function updateWeeklyComplete(wd, w, on) {
  let m = document.getElementById("monthGoalText").title;
  let y = document.getElementById("annualGoalText").title;
  const weekRef = doc(db, 'weekGoals', user + '-' + year + '.' + month + '.' + week + '-' + y + '-' + m + '-' + w);
  const weekSnap = await getDoc(weekRef);
  let daysComplete = weekSnap.data().totalDaysComplete;
  let data = {};
  if (on) {
    switch (wd) {
      case "sunday":
        data = { sunday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "monday":
        data = { monday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "tuesday":
        data = { tuesday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "wednesday":
        data = { wednesday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "thursday":
        data = { thursday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "friday":
        data = { friday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
      case "saturday":
        data = { saturday_complete: true, totalDaysComplete: daysComplete + 1 };
        break;
    };
  } else {
    switch (wd) {
      case "sunday":
        data = { sunday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "monday":
        data = { monday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "tuesday":
        data = { tuesday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "wednesday":
        data = { wednesday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "thursday":
        data = { thursday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "friday":
        data = { friday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
      case "saturday":
        data = { saturday_complete: false, totalDaysComplete: daysComplete - 1 };
        break;
    };
  };
  updateDoc(weekRef, data)
    .then(week_Ref => {
      console.log("Data successfully updated")
    })
    .catch(error => {
      console.log(error);
    });
};



//Other Helpful Functions

function left(str, chr) {
  return str.slice(0, chr - str.length);
}

function right(str, chr) {
  return str.slice(str.length - chr, str.length);
};

function getCurrentWeek() {
  // Create a copy of this date object  
  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 1);
  let oneDay = 1000 * 60 * 60 * 24;
  let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000); //This accounts for changes in daylight savings
  let dayDiff = Math.floor(diff / oneDay);
  let weekDay = now.getDay();
  let firstLastYear = new Date(now.getFullYear() - 1, 0, 1);
  let daysToSunday = 0;
  let weekNum = 0;
  if (dayDiff < weekDay) { //If the weekday > days in year then no Sundays yet in year, we are currently in a week from the year before
    if ((firstLastYear.getFullYear() % 4) == 0) {//Check to see if it is a leap year
      if (firstLastYear.getDay() < 2) {//If so, check to see if Jan 1 was Sun or Mon
        weekNum = 53;
      } else {
        weekNum = 52;
      }
    } else {
      if (firstLastYear.getDay() < 1) {//If not leap year, check to see if Jan 1 was Sun
        weekNum = 53;
      } else {
        weekNum = 52;
      }
    };
  } else {//If weekday < days, then we are in a week of the current year
    if (start.getDay() != 0) {//If the year did not start on a Sunday, determine how many days until the first Sunday
      daysToSunday = 7 - start.getDay();
    };
    weekNum = Math.ceil((dayDiff - daysToSunday + 1) / 7); //Add 1 for rounding
  };
  return weekNum;
};