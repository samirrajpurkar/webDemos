// Global variables will go here
var clickedArray = []; //clickedArray keep track of Clicked cells.
var interval;
var started = false;
var time = 0;
var ready = true; //whether the applicaiton is able to handle click events
var numCompleted = 0; // keeps track of # of cells that have been completed

//function definitions goes here
var startTimer = function ( ) {
  if (started === false) {
    interval = setInterval(function () {
      time++;
      document.getElementById('timer').innerHTML = 'Time Elapsed: ' + time;
    }, 1000);
  }
  started = true;
};

var randomAnswers = function ( ) {
  var answers = [1,1,2,2,3,3,4,4,5];
  answers.sort(function (item) {
    return .5 - Math.random();
  });
  return answers;
};
var hide = function (cell) {
  cell.clicked = false;
  cell.innerHTML = '';
  cell.style.background = 'blue';
};
var complete = function (cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.background = 'purple';
};
var reveal = function (cell) {
  cell.clicked = true;
  cell.innerHTML = cell.value;
  cell.style.background = 'red';
};
var resetClickedArray = function () {
  clickedArray = [];
};
var addEventListenerToEachCell = function (cell) {
  cell.addEventListener('mouseenter', function (e) {
    if (this.completed === false && this.clicked === false) {
      this.style.background = 'orange';
    }
  }); // Mouse enter and the grid background changes to orange
  cell.addEventListener('mouseleave', function (e) {
    if (this.completed === false && this.clicked === false) {
      this.style.background = 'blue';
    }
  }); // Mouse leave and the grid regains it color back to blue
  cell.addEventListener('click', function (e) {
    if (ready === false) {
      return;
    }
    if (started === false) {
      startTimer();
    }
    clickedArray.push(cell);
    reveal(cell);
    if (clickedArray.length === 2) {
      if ( (clickedArray[0].value === clickedArray[1].value) &&
           (clickedArray[1].isSameNode(clickedArray[0]) === false) )
       {
        // if a matching pair is found
        complete(clickedArray[0]);
        complete(clickedArray[1]);
        clickedArray = [];
        if (numCompleted === 8) {
          console.log('You won');
          clearInterval(interval);
        }
      }
      else {
            // if a matching pair is not found
        ready = false;
        document.getElementById('gridTable').style.border = '5px solid red';
        setTimeout(function () {
          // after a 500 ms delay
          hide(clickedArray[0]);
          hide(clickedArray[1]);
          clickedArray = [];
          ready = true;
          document.getElementById('gridTable').style.border = '5px solid black';
        }, 500);
      }
    }
  });
};

// Setup
var setup = function ( ) {
  var answers = randomAnswers();
  var grid = document.getElementsByTagName('td');
  for (var i = 0; i < grid.length; i++) {
    var cell = grid[i];
    cell.completed = false;
    cell.clicked = false;
    cell.value = answers[i];
    addEventListenerToEachCell(cell);
  }
  document.getElementById('restart').addEventListener('click', function (e) {
    location.reload();
  });
};

// Execute functions here
setup();
