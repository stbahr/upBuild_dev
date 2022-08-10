//Import Firestore capabilities
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';

import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';

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


//Sign Up

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('buttonSignUpConfirm').addEventListener('click', () => {
    const signups = SignUp(db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function SignUp(db) {
  //I need to integrate the Firebase Auth to create new users using this button
  document.getElementById('landing').classList.remove('active');
  document.getElementById('ultimateGoal').classList.add('active');
}


//Ultimate Submit Button

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ultimateSubmit').addEventListener('click', () => {
    const goals = addUltimateGoals(db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function addUltimateGoals(db) {
  let ultimateGoal = document.getElementById('inputUltimateGoal').value;
  let goal = {
    user: "sbahr96",
    ultimateGoal
  };
  const goalRef = doc(db, 'ultimateGoals', goal.user);
  const goalSnap = await getDoc(goalRef);

  if (ultimateGoal == '') {
    document.getElementById("noData").classList.add('active');
    document.getElementById("overlayDark").classList.add('active');
  } //else if (goalSnap.exists()) {
  //   console.error("Goal ID Already Exists")
  // } 
  else {
    await setDoc(doc(db, 'ultimateGoals', goal.user), {
      goal
    });
    document.getElementById('ultimateGoal').classList.remove('active');
    document.getElementById('annual').classList.add('active');
    document.getElementById('annualQuote').innerHTML = ultimateGoal;
    return 'Ultimate Goals Added';
  };
};


//Annual Submit Button

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('annualSubmit').addEventListener('click', () => {
    const goals = addAnnualGoals(db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function addAnnualGoals(db) {
  const now = new Date();
  const thisUser = 'sbahr96';
  let thisYear = now.getFullYear();
  if ((now.getMonth() == 0) && (now.getDate() <= now.getDay())) {//No Sunday yet in the year
    thisYear = thisYear - 1;
  };

  let goalName1 = document.getElementById('inputG1Name').value;
  let goalDesc1 = document.getElementById('inputG1Desc').value;
  let goalName2 = document.getElementById('inputG2Name').value;
  let goalDesc2 = document.getElementById('inputG2Desc').value;
  let goalName3 = document.getElementById('inputG3Name').value;
  let goalDesc3 = document.getElementById('inputG3Desc').value;
  let goalName4 = document.getElementById('inputG4Name').value;
  let goalDesc4 = document.getElementById('inputG4Desc').value;
  let goal = {
    user: thisUser,
    year: thisYear,
    annualGoalNumber: 1,
    name: goalName1,
    desc: goalDesc1,
    complete: false
  };
  let counter = 0;
  const goalRef = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-1');
  const goalSnap = await getDoc(goalRef);

  if (goalName1 == '' || goalDesc1 == '') {
    document.getElementById("noData").classList.add('active');
    document.getElementById("overlayDark").classList.add('active');
    // console.error("No Data Found");
  } //else if (goalSnap.exists()) {
  //   console.error("Goal ID Already Exists")
  // } 
  else {
    await setDoc(doc(db, 'annualGoals', goal.user + '-' + goal.year + '-1'), {
      user: thisUser,
      year: thisYear,
      annualGoalNumber: 1,
      name: goalName1,
      desc: goalDesc1,
      complete: false
    });
    counter += 1;
    if (goalName2 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 2,
        name: goalName2,
        desc: goalDesc2,
        complete: false
      };
      await setDoc(doc(db, 'annualGoals', goal.user + '-' + goal.year + '-2'), {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 2,
        name: goalName2,
        desc: goalDesc2,
        complete: false
      });
      counter += 1;
    };
    if (goalName3 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 3,
        name: goalName3,
        desc: goalDesc3,
        complete: false
      };
      await setDoc(doc(db, 'annualGoals', goal.user + '-' + goal.year + '-3'), {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 3,
        name: goalName3,
        desc: goalDesc3,
        complete: false
      });
      counter += 1;
    };
    if (goalName4 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 4,
        name: goalName4,
        desc: goalDesc4,
        complete: false
      };
      await setDoc(doc(db, 'annualGoals', goal.user + '-' + goal.year + '-4'), {
        user: thisUser,
        year: thisYear,
        annualGoalNumber: 4,
        name: goalName4,
        desc: goalDesc4,
        complete: false
      });
      counter += 1;
    };
    document.getElementById('annual').classList.remove('active');
    document.getElementById('month1').classList.add('active');
    document.getElementById('monthQuote-1').innerHTML = goalName1 + " - " + goalDesc1;
    return counter + ' Annual Goals Added';
  };
};


//Monthly Submit Button

const submitMonthButtons = document.querySelectorAll('[data-submit-month]');

submitMonthButtons.forEach(button => {
  button.addEventListener('click', () => {
    const month = button.dataset.submitMonth;
    const monthGoals = submitMonth(month, db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function submitMonth(month, db) {
  const now = new Date();
  const thisUser = 'sbahr96';
  let thisYear = now.getFullYear();
  if ((now.getMonth() == 0) && (now.getDate() <= now.getDay())) {//No Sunday yet in the year
    thisYear = thisYear - 1;
  };
  let thisMonth = now.getMonth() + 1;
  if (now.getDate() <= now.getDay()) {//No Sunday yet in the month
    if (now.getMonth() == 0) {//January
      thisMonth = 12;
    } else {
      thisMonth = thisMonth - 1;
    }
  };
  let y = right(month, 1);
  let w = y + "-1";
  let week_id = "week" + w;
  let quote_id = "weekQuote" + w;
  let goalName1 = document.getElementById('inputG1NameMonth' + y).value;
  let goalDesc1 = document.getElementById('inputG1DescMonth' + y).value;
  let goalName2 = document.getElementById('inputG2NameMonth' + y).value;
  let goalDesc2 = document.getElementById('inputG2DescMonth' + y).value;
  let goalName3 = document.getElementById('inputG3NameMonth' + y).value;
  let goalDesc3 = document.getElementById('inputG3DescMonth' + y).value;
  let goal = {
    user: thisUser,
    year: thisYear,
    month: thisMonth,
    annualGoalNumber: y,
    monthGoalNumber: 1,
    name: goalName1,
    desc: goalDesc1,
    complete: false
  };
  let counter = 0;
  const goalRef = doc(db, 'monthGoals', goal.user + '-' + goal.year + '-' + goal.month + '-' + y + '-1');
  const goalSnap = await getDoc(goalRef);
  if (goalName1 == '' || goalDesc1 == '') {
    document.getElementById("noData").classList.add('active');
    document.getElementById("overlayDark").classList.add('active');
    //console.error("No Data Found");
  } //else if (goalSnap.exists()) {
  //console.error("Goal ID Already Exists")
  //} 
  else {
    await setDoc(doc(db, 'monthGoals', goal.user + '-' + goal.year + '.' + goal.month + '-' + y + '-1'), {
      user: thisUser,
      year: thisYear,
      month: thisMonth,
      annualGoalNumber: y,
      monthGoalNumber: 1,
      name: goalName1,
      desc: goalDesc1,
      complete: false
    });
    counter += 1;
    if (goalName2 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        annualGoalNumber: y,
        monthGoalNumber: 1,
        name: goalName2,
        desc: goalDesc2,
        complete: false
      }
      await setDoc(doc(db, 'monthGoals', goal.user + '-' + goal.year + '.' + goal.month + '-' + y + '-2'), {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        annualGoalNumber: y,
        monthGoalNumber: 1,
        name: goalName2,
        desc: goalDesc2,
        complete: false
      });
      counter += 1;
    }
    if (goalName3 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        annualGoalNumber: y,
        monthGoalNumber: 1,
        name: goalName3,
        desc: goalDesc3,
        complete: false
      }
      await setDoc(doc(db, 'monthGoals', goal.user + '-' + goal.year + '.' + goal.month + '-' + y + '-3'), {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        annualGoalNumber: y,
        monthGoalNumber: 1,
        name: goalName3,
        desc: goalDesc3,
        complete: false
      });
      counter += 1;
    }
    document.getElementById(month).classList.remove('active');
    document.getElementById(week_id).classList.add('active');
    document.getElementById(quote_id).innerHTML = goalName1 + " - " + goalDesc1;
    return counter + ' Monthly Goals Added';
  }
}


// Weekly Submit Button

const submitWeekButtons = document.querySelectorAll('[data-submit-week]');

submitWeekButtons.forEach(button => {
  button.addEventListener('click', () => {
    const week = button.dataset.submitWeek;
    const weekGoals = submitWeek(week, db)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
});

async function submitWeek(week, db) {
  const now = new Date();
  const thisUser = 'sbahr96';
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let thisYear = now.getFullYear();
  if ((now.getMonth() == 0) && (now.getDate() <= now.getDay())) {//No Sunday yet in the year
    thisYear = thisYear - 1;
  };
  let thisMonth = now.getMonth() + 1;
  if (now.getDate() <= now.getDay()) {//No Sunday yet in the month
    if (now.getMonth() == 0) {//January
      thisMonth = 12;
    } else {
      thisMonth = thisMonth - 1;
    }
  };
  let thisWeek = getCurrentWeek();
  let sunday = new Date(now - (now.getDay() * 1000 * 60 * 60 * 24));
  let thisSunday = sunday.getDate(); //This is the day of the month of the Sunday that started this week
  let ym = right(week, 3);
  let w = ym + "-1";
  let m = +right(ym, 1);
  let y = +left(ym, 1);
  let next_id = "";
  let next_quote_id = "";
  let next_quote = "";
  let m1 = m + 1;
  let y1 = y + 1;

  let goalName1 = document.getElementById('inputG1NameWeek' + ym).value;
  let goalDesc1 = document.getElementById('inputG1DescWeek' + ym).value;
  let sun1 = document.getElementById('Sunday' + w).classList.contains('selected');
  let mon1 = document.getElementById('Monday' + w).classList.contains('selected');
  let tue1 = document.getElementById('Tuesday' + w).classList.contains('selected');
  let wed1 = document.getElementById('Wednesday' + w).classList.contains('selected');
  let thu1 = document.getElementById('Thursday' + w).classList.contains('selected');
  let fri1 = document.getElementById('Friday' + w).classList.contains('selected');
  let sat1 = document.getElementById('Saturday' + w).classList.contains('selected');

  w = ym + "-2";
  let goalName2 = document.getElementById('inputG2NameWeek' + ym).value;
  let goalDesc2 = document.getElementById('inputG2DescWeek' + ym).value;
  let sun2 = document.getElementById('Sunday' + w).classList.contains('selected');
  let mon2 = document.getElementById('Monday' + w).classList.contains('selected');
  let tue2 = document.getElementById('Tuesday' + w).classList.contains('selected');
  let wed2 = document.getElementById('Wednesday' + w).classList.contains('selected');
  let thu2 = document.getElementById('Thursday' + w).classList.contains('selected');
  let fri2 = document.getElementById('Friday' + w).classList.contains('selected');
  let sat2 = document.getElementById('Saturday' + w).classList.contains('selected');

  let goal = {
    user: thisUser,
    year: thisYear,
    month: thisMonth,
    week: thisWeek,
    startWeek: thisSunday,
    annualGoalNumber: y,
    monthGoalNumber: m,
    weekGoalNumber: 1,
    name: goalName1,
    desc: goalDesc1,
    sunday: sun1,
    monday: mon1,
    tuesday: tue1,
    wednesday: wed1,
    thursday: thu1,
    friday: fri1,
    saturday: sat1,
    totalDays: sun1 + mon1 + tue1 + wed1 + thu1 + fri1 + sat1,
    sunday_complete: false,
    monday_complete: false,
    tuesday_complete: false,
    wednesday_complete: false,
    thursday_complete: false,
    friday_complete: false,
    saturday_complete: false,
    totalDaysComplete: 0
  };
  let counter = 0;

  const goalRef = doc(db, 'weekGoals', goal.user + '-' + goal.year + '.' + goal.month + '.' + goal.week + '-' + ym + '-1');
  const goalSnap = await getDoc(goalRef);

  const goalRefMonth = doc(db, 'monthGoals', goal.user + '-' + goal.year + '.' + goal.month + '-' + y + '-' + m1);
  const goalSnapMonth = await getDoc(goalRefMonth);

  const goalRefAnnualNext = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-' + y1);
  const goalSnapAnnualNext = await getDoc(goalRefAnnualNext);
  
  const goalRefAnnual1 = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-1');
  const goalSnapAnnual1 = await getDoc(goalRefAnnual1);
  const goalRefAnnual2 = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-2');
  const goalSnapAnnual2 = await getDoc(goalRefAnnual2);
  const goalRefAnnual3 = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-3');
  const goalSnapAnnual3 = await getDoc(goalRefAnnual3);
  const goalRefAnnual4 = doc(db, 'annualGoals', goal.user + '-' + goal.year + '-4');
  const goalSnapAnnual4 = await getDoc(goalRefAnnual4);

  const goalRefMonthNext = doc(db, 'monthGoals', goal.user + '-' + goal.year + '.' + goal.month + '-' + y1 + '-' + 1);
  const goalSnapMonthNext = await getDoc(goalRefMonthNext);


  if (goalName1 == '' || goalDesc1 == '') {
    document.getElementById("noData").classList.add('active');
    document.getElementById("overlayDark").classList.add('active');
    // console.error("No Data Found");
  } //else if (goalSnap.exists()) {
  //console.error("Goal ID Already Exists")
  //} 
  else {
    await setDoc(doc(db, 'weekGoals', goal.user + '-' + goal.year + '.' + goal.month + '.' + goal.week + '-' + ym + '-1'), {
      user: thisUser,
      year: thisYear,
      month: thisMonth,
      week: thisWeek,
      startWeek: thisSunday,
      annualGoalNumber: y,
      monthGoalNumber: m,
      weekGoalNumber: 1,
      name: goalName1,
      desc: goalDesc1,
      sunday: sun1,
      monday: mon1,
      tuesday: tue1,
      wednesday: wed1,
      thursday: thu1,
      friday: fri1,
      saturday: sat1,
      totalDays: sun1 + mon1 + tue1 + wed1 + thu1 + fri1 + sat1,
      sunday_complete: false,
      monday_complete: false,
      tuesday_complete: false,
      wednesday_complete: false,
      thursday_complete: false,
      friday_complete: false,
      saturday_complete: false,
      totalDaysComplete: 0
    });
    counter += 1;
    if (goalName2 != '') {
      let goal = {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        week: thisWeek,
        startWeek: thisSunday,
        annualGoalNumber: y,
        monthGoalNumber: m,
        weekGoalNumber: 1,
        name: goalName2,
        desc: goalDesc2,
        sunday: sun2,
        monday: mon2,
        tuesday: tue2,
        wednesday: wed2,
        thursday: thu2,
        friday: fri2,
        saturday: sat2,
        totalDays: sun2 + mon2 + tue2 + wed2 + thu2 + fri2 + sat2,
        sunday_complete: false,
        monday_complete: false,
        tuesday_complete: false,
        wednesday_complete: false,
        thursday_complete: false,
        friday_complete: false,
        saturday_complete: false,
        totalDaysComplete: 0
      }
      await setDoc(doc(db, 'weekGoals', goal.user + '-' + goal.year + '.' + goal.month + '.' + goal.week + '-' + ym + '-2'), {
        user: thisUser,
        year: thisYear,
        month: thisMonth,
        week: thisWeek,
        startWeek: thisSunday,
        annualGoalNumber: y,
        monthGoalNumber: m,
        weekGoalNumber: 1,
        name: goalName2,
        desc: goalDesc2,
        sunday: sun2,
        monday: mon2,
        tuesday: tue2,
        wednesday: wed2,
        thursday: thu2,
        friday: fri2,
        saturday: sat2,
        totalDays: sun2 + mon2 + tue2 + wed2 + thu2 + fri2 + sat2,
        sunday_complete: false,
        monday_complete: false,
        tuesday_complete: false,
        wednesday_complete: false,
        thursday_complete: false,
        friday_complete: false,
        saturday_complete: false,
        totalDaysComplete: 0
      });
      counter += 1;
    }

    if (goalSnapMonth.exists()) {//If there is another monthly goal for the current annual goal
      next_id = "week" + y + "-" + m1;
      next_quote_id = "weekQuote" + y + "-" + m1;
      next_quote = goalSnapMonth.data().name + " - " + goalSnapMonth.data().desc;
      document.getElementById(next_quote_id).innerHTML = next_quote;
    } else if (goalSnapMonthNext.exists()) {//If there is already a monthly goal for the next annual goal
      next_id = "week" + y1 + "-1";
      next_quote_id = "weekQuote" + y1 + "-1";
      next_quote = goalSnapMonthNext.data().name + " - " + goalSnapMonthNext.data().desc;
      document.getElementById(next_quote_id).innerHTML = next_quote;
    } else {//There is not a monthly goal for the current or next annual goal
      if (goalSnapAnnualNext.exists()) {//If there is another annual goal for the current year
        next_id = "month" + y1;
        next_quote_id = "monthQuote-" + y1;
        next_quote = goalSnapAnnualNext.data().name + " - " + goalSnapAnnualNext.data().desc;
        document.getElementById(next_quote_id).innerHTML = next_quote;
      } else {
        next_id = "existingMain";
        document.getElementById('todayDate').innerHTML = monthName[+now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
        document.getElementById('annualGoalExist1').innerHTML = goalSnapAnnual1.data().name;
        if (goalSnapAnnual2.exists()){
          document.getElementById('annualExist2').classList.add('visible');
          document.getElementById('annualGoalExist2').innerHTML = goalSnapAnnual2.data().name;
        };
        if (goalSnapAnnual3.exists()){
          document.getElementById('annualExist3').classList.add('visible');
          document.getElementById('annualGoalExist3').innerHTML = goalSnapAnnual3.data().name;
        };
        if (goalSnapAnnual4.exists()){
          document.getElementById('annualExist4').classList.add('visible');
          document.getElementById('annualGoalExist4').innerHTML = goalSnapAnnual4.data().name;
        };
      };
    };

    document.getElementById(week).classList.remove('active');
    document.getElementById(next_id).classList.add('active');
    return counter + " Weekly Goals Submitted";
  }
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