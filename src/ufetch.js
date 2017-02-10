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

// this init object defines the method, headers, mode and the body of the request.
var initObject = {
  method: 'POST',
  headers: new Headers(),
  mode: 'cors',
  body: {}
};

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (result) {
    return result.json();
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log('Error : ', err);
  });

var myBody = {
  id: 12345,
  name: 'abc',
  age: 21
};

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var initObject1 = {
  headers: myHeaders,
  body: JSON.stringify(myBody),
  mode: 'cors'
};

var initObject2 = {
  method: 'GET',
  headers: new Headers(),
  mode: 'no-cors',
  body: {}
};
var request = new Request('https://jsonplaceholder.typicode.com/posts',initObject);
// First time using Request Object
fetch(request)
  .then(function (result) {
    return result.json();
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log('Error : ', error);
  });
// Second time using Request Object
fetch(request)
  .then(function (result) {
    return result.json();
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log('Error : Request Object cannot be used more than once ' +
                'in Fetch requests that invovles bodies (HEAD, GET');
  });

