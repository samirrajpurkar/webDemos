/* READY STATES
  0 - request not initiated
  1 - request has been set up
  2 - request has been sent
  3 - request is in process
  4 - request is complete
*/
// window.onload = function ( ) {
//   var http = new XMLHttpRequest();

//   http.onreadystatechange = function ( ) {
//     if (http.readyState === 4 && http.status === 200) {
//       // console.log(JSON.parse(http.response));
//     }
//   };

//   http.open('GET', './data/tweets.json', true);
//   http.send();

//   //Jquery way to do this.. and it is simple.
//   $.get('./data/tweets.json', function (data) {
//     console.log(data);
//   });
// };

// window.onload = function ( ) {
//   var fruits = ['banana', 'apple', 'pear'];
//   fruits.forEach(function (fruit) {
//     console.log(fruit);
//   });
// };

// window.onload = function ( ) {
//   function handleError(jqXHR, textStatus, error) {
//     console.log(error);
//   }

//   $.ajax({
//     type: 'GET',
//     url: './data/tweets.json',
//     success: function (tweet) {
//       console.log(tweet);

//       $.ajax({
//         type: 'GET',
//         url: './data/friends.json',
//         success: function (friend) {
//           console.log(friend);

//           $.ajax({
//             type: 'GET',
//             url: './data/videos.json',
//             success: function (video) {
//               console.log(video);
//             },
//             error: handleError
//           });
//         },

//         error: handleError
//       });
//     },
//     error: handleError
//   });
// };
window.onload = function ( ) {
  function get(url) {
    return new Promise(function (resolve, reject) {
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.onload = function ( ) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.response));
        }
        else {
          reject(xhttp.statusText);
        }
      };
      xhttp.onerror = function ( ) {
        reject(xhttp.statusText);
      };
      xhttp.send();
    });
  }

  var promise = get('./data/tweets.json');
  promise.then(function (tweets) {
    console.log(tweets);
    return get('./data/friends.json');
  }).then(function (friends) {
    console.log(friends);
    return get('./data/videos.json');
  }).then(function (videos) {
    console.log(videos);
  }).catch(function (error) {
    console.log('ERROR getting videos', error);
  }).catch(function (error) {
    console.log('ERROR getting friends', error);
  }).catch(function (error) {
    console.log('ERROR in getting Tweets : ', error);
  });
};

