// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.


$(() => {
  //DOM Elements
  let currentDayEl = $('#currentDay');
  let timeBlockEl = $('.time-block');

  // TODO: This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?
  // function listens for click events on the save button. 
  const handleSaveTask = (event) => {

    let saveButton = $(event.currentTarget);
    let hourId = saveButton.parent().attr('id');
    let description = saveButton.siblings('.description').val().trim();
    // let newTask = {
    //   hour: hourId,
    //   task: description
    // };
    // console.log(newTask);
    // let tasks = readTasksFromStorage();
    // tasks.push(newTask);

    saveTasksToStorage(hourId, description);
  };

  const printTasks = () => {

  }

  // function grabs tasks from local storage if they exist otherwise creates an empty array
  const readTasksFromStorage = () => {

    for (let i = 0; i < timeBlockEl.length; i++) {
      let hourId = timeBlockEl.eq(i).attr('id');
      console.log(hourId);

      let tasks = localStorage.getItem(hourId);
      if (tasks) {
        tasks = JSON.parse(tasks);
      } else {
        tasks = '';
      }
      console.log(tasks);

    }
    // return tasks;

  };

  // function sets tasks to local storage
  const saveTasksToStorage = (hour, tasks) => {
    localStorage.setItem(hour, JSON.stringify(tasks));
    console.log(tasks);
  }

  // function dispays current date in the 'Thursday, February 23rd' format
  const displayDate = () => {
    let daySuffix;
    let dayOfMonth = dayjs().format('D');
    let endDigit = dayOfMonth.slice(-1);

    if (endDigit === '1') {
      daySuffix = 'st';
    } else if (endDigit === '2') {
      daySuffix = 'nd';
    } else if (endDigit === '3') {
      daySuffix = 'rd';
    } else {
      daySuffix = 'th';
    }

    currentDayEl = currentDayEl.text(dayjs().format(`dddd, MMMM D[${daySuffix}]`));
  }

  // function applies the past, present, or future class to each time block by comparing the id to the current hour. 
  const timeBlockColor = () => {
    //gets current hour in 01-24 format
    let currentHour = dayjs().format('HH');

    //function that for each element with class 'time-block' will get the id of that element and check if the last two digits (ex: id="hour-10" will use 10) are greater, equal to, or less than the current hour. it will then add the appropriate class name past, present, or future and remove the others
    $.map($(timeBlockEl), (i) => {

      // setting the last two digits of the id to a variable (used as a comparator against current hour)
      let index = $(i).attr('id').slice(-2);

      //the whole id of each element used as a selector to set classes
      let hourId = $(i).attr('id');

      //if statements comparing 
      if (index > currentHour) {
        $(`#${hourId}`).removeClass('past present').addClass('future');
        // console.log($(`#${hourId}`).attr('class'));
      } else if (index === currentHour) {
        $(`#${hourId}`).removeClass('future past').addClass('present');
        // console.log($(`#${hourId}`).attr('class'));
      } else {
        $(`#${hourId}`).removeClass('present future').addClass('past');
        // console.log($(`#${hourId}`).attr('class'));
      }
    })
  };

  //call functions to run
  displayDate();
  timeBlockColor();
  readTasksFromStorage();

  //event handlers
  timeBlockEl.on('click', '.saveBtn', handleSaveTask);
});
