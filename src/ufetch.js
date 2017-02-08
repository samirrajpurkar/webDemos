fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(function (result) {
    return result.json();
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });