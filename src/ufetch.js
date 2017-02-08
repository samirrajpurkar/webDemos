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

  // fetching a bad url
fetch('https://jsonplaceholder.typicode.com/bad_url/1')
    .then(function (result) {
      console.log(result);
      if (result.ok) {
        return result.text();
      }
      else {
        return Promise.reject(result.status);
      }
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log('Error while fetching the URL ' + error);
    });