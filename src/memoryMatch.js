// Global variables will go here
var clickedArray = []; //clickedArray keep track of Clicked cells.

//function definitions goes here
var randomAnswers = function ( ) {
  var answers = [1,1,2,2,3,3,4,4,5];
  answers.sort(function (item) {
    return .5 - Math.random();
  });
  return answers;
};

var reveal = function (cell) {
  cell.clicked = true;
  cell.innerHTML = cell.value;
  cell.style.background = 'red';
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
      if (this.completed === false && this.clicked === false) {
        clickedArray.push(this);
        reveal(this);
        console.log(clickedArray);
      }
    });
  }
};

// Execute functions here
setup();
