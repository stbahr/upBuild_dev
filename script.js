//****Open and Close SignUp and Login Modals****

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const overlayDark = document.getElementById('overlayDark');

//Determine the appropriate modal, and then open (make active)

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

//Identify active modal and then close (For overlay)

overlay.addEventListener('click', () => {
  const actives = document.querySelectorAll('.modal.active');
  actives.forEach(active => {
    closeLogin(active)
  });
});

//Identify active modal and then close (For close button)

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeLogin(modal);
  });
});

//Open modal function; Adds active class to appropriate modal and overlay

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

//Close modal function; Removes active class to appropriate modal and overlay

function closeLogin(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  overlayDark.classList.remove('active');
}


//****Move along the introduction modals****
const introModals = document.querySelectorAll('[data-intro-target]');

introModals.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.dataset.introTarget;
    moveIntroModal(modal,button.classList.contains('next'));
  })
});

function moveIntroModal(modal,x) {
    let m = +right(modal, 1);
    let modal_down = "intro"+(m-1);
    if (m < 7) {
      if (x) {
        document.getElementById(modal).classList.add('active');
        document.getElementById(modal_down).classList.remove('active');
      } else {
        document.getElementById(modal).classList.remove('active');
        document.getElementById(modal_down).classList.add('active');
      };
    } else {
      document.getElementById(modal_down).classList.remove('active');
      document.getElementById('overlayIntro').classList.remove('active');
    };
  // modal.classList.add('active');
};


//****Add and remove annual goals****

const addNewGoal = document.querySelectorAll('[data-add-goal]');
const removeSection = document.querySelectorAll('[data-remove-section]');


//Determine the appropriate button, and then add goal on click

addNewGoal.forEach(button => {
  button.addEventListener('click', () => {
    addGoal();
  })
})


//Determine the appropriate button, and then remove goal on click

removeSection.forEach(button => {
  button.addEventListener('click', () => {
    removeGoal();
  })
})


//Function to make the appropriate goal box visible

function addGoal() {
  const a2 = document.getElementById("annual2");
  const a3 = document.getElementById("annual3");
  const a4 = document.getElementById("annual4");
  const plus = document.getElementById("addButtonBox");
  if (!a2.classList.contains('visible')) {
    a2.classList.add('visible');
  } else if (!a3.classList.contains('visible')) {
    a3.classList.add('visible');
  } else {
    a4.classList.add('visible');
    plus.classList.remove('visible');
  };
};


//Function to remove the appropriate goal box

function removeGoal() {
  const a4 = document.getElementById("annual4");
  const a3 = document.getElementById("annual3");
  const a2 = document.getElementById("annual2");
  const plus = document.getElementById("addButtonBox");
  if (a4.classList.contains('visible')) {
    a4.classList.remove('visible');
    plus.classList.add('visible');
  } else if (a3.classList.contains('visible')) {
    a3.classList.remove('visible');
  } else {
    a2.classList.remove('visible');
  };
};


//****Add new and remove Montly Goals****

const addNewMonth = document.querySelectorAll('[data-month-target]');
const removeMonths = document.querySelectorAll('[data-remove-month]');


//Determine the appropriate button, and then add goal on click

addNewMonth.forEach(button => {
  button.addEventListener('click', () => {
    const month = button.id;
    addMonth(month);
  });
});


//Determine the appropriate button, and then remove goal on click

removeMonths.forEach(button => {
  button.addEventListener('click', () => {
    const month = button.id;
    removeMonth(month);
  });
});


//Function to make the appropriate month box visible

function addMonth(month) {
  const m = right(month,1);
  const m2ID = "month" + m + "-2";
  const m3ID = "month" + m + "-3";
  const plusID = "addButtonBoxMonth" + m
  const m2 = document.getElementById(m2ID);
  const m3 = document.getElementById(m3ID);
  const plus = document.getElementById(plusID);
  if (!m2.classList.contains('visible')) {
    m2.classList.add('visible');
  } else {
    plus.classList.remove('visible');
    m3.classList.add('visible');
  };
  // console.log(m2.innerHTML)
};


//Function to remove the appropriate month box

function removeMonth(month) {
  const m = right(month,1);
  const m2ID = "month" + m + "-2";
  const m3ID = "month" + m + "-3";
  const plusID = "addButtonBoxMonth" + m
  const m2 = document.getElementById(m2ID);
  const m3 = document.getElementById(m3ID);
  const plus = document.getElementById(plusID);
  if (m3.classList.contains('visible')) {
    m3.classList.remove('visible');
    plus.classList.add('visible');
  } else {
    m2.classList.remove('visible');
  };
};


//****Add new and remove Weekly Goals****

const addNewWeek = document.querySelectorAll('[data-week-target]');
const removeWeeks = document.querySelectorAll('[data-remove-week]');


//Determine the appropriate button, and then add goal on click

addNewWeek.forEach(button => {
  button.addEventListener('click', () => {
    const week = button.id;
    addWeek(week);
  });
});


//Determine the appropriate button, and then remove goal on click

removeWeeks.forEach(button => {
  button.addEventListener('click', () => {
    const week = button.id;
    removeWeek(week);
  });
});

//Function to make the appropriate week box visible

function addWeek(week) {
  const w = right(week,3);
  const w2ID = "week" + w + "-2";
  const plusID = "addButtonBoxWeek" + w
  const w2 = document.getElementById(w2ID);
  const plus = document.getElementById(plusID);
  if (!w2.classList.contains('visible')) {
    w2.classList.add('visible');
    plus.classList.remove('visible');
  };
  // console.log(m2.innerHTML)
};


//Function to remove the appropriate week box

function removeWeek(week) {
  const w = right(week,3);
  const w2ID = "week" + w + "-2";
  const plusID = "addButtonBoxWeek" + w
  const w2 = document.getElementById(w2ID);
  const plus = document.getElementById(plusID);
  if (w2.classList.contains('visible')) {
    w2.classList.remove('visible');
    plus.classList.add('visible');
  };
};



//****Change the color of the day selected button that is selected****

const daySelected = document.querySelectorAll('[data-day-select]');

daySelected.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
    } else {
      button.classList.add('selected');
    }
  });
});


//Other Helpful Functions

function right(str, chr) {
  return str.slice(str.length-chr,str.length);
};


