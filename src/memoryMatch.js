// Global variables will go here

//function definitions goes here
var randomAnswers = function ( ) {
  var answers = [1,1,2,2,3,3,4,4,5];
  answers.sort(function (item) {
    return .5 - Math.random();
  });
  return answers;
};

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

  }
};

// Execute functions here
setup();
