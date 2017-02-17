function run(genRFunc) {
  const genRObject = genRFunc(); // creating a generator object

  function iterate(iteration) {
    if (iteration.done) {
      return Promise.resolve(iteration.value);
    }
    return Promise.resolve(iteration.value)
              .then(x => iterate(genRObject.next(x)))
              .catch(x => iterate(genRObject.throw(x)));
  }

  try {
    return iterate(genRObject.next());
  } catch (ex) {
    return Promise.reject(ex);
  }
}

function *gen() {
  // check if the input is valid
  if (document.getElementById('input').value > 7 ||
      document.getElementById('input').value < 1) {
    throw new Error('Invalid Input - Enter a number between 1 and 7');
  }
  //fetch the film
  var filmResponse = yield fetch('http://swapi.co/api/films/' +
                          document.getElementById('input').value);
  var film = yield filmResponse.json();

  //fetch the characters
  console.log(film.characters);
  var charactersResponse = yield fetch(film.characters[0]);
  var character = yield charactersResponse.json();

  //display film title and characters in the film
  document.getElementById('filmText').innerHTML = 'Film : ' + film.title;
  document.getElementById('charactersText').innerHTML =
                                        'Characters : <br>' +
                                        character.name +
                                        '<br>';
}

document.getElementById('searchButton').addEventListener('click',
  function (event) {
    run(gen).catch(function (error) {
      //console.log(error.message);
      document.getElementById('error').innerHTML = error.message;
    });
  });

document.getElementById('input').addEventListener('focus',
    function (event) {
      document.getElementById('error').innerHTML = '';
      document.getElementById('filmText').innerHTML = 'Film : ';
      document.getElementById('charactersText').innerHTML = 'Characters : ';
    });