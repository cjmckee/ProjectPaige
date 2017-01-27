/*
  Trying to make some sort of passwordless login page
*/

getFace('http://i.imgur.com/paPde5e.jpg').then(function(response) {
  console.log(response);
}), function(error) {
  console.log("Something went wrong", error);
}

/*
  Returns faceId plus some more info as a JSON object assuming url for image
*/
function getFace(url) {
  //required modules for running on node server
  var jsdom = require("jsdom").jsdom;
  var doc = jsdom();
  var window = doc.defaultView;
  $ = require('jquery')(window);

  var key = "f2f1f91fa50342b2bda8335bfb04d2fa";

  var apiUrl = "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";

  return new Promise(function(resolve, reject) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', apiUrl, true);
    xhttp.setRequestHeader("Ocp-Apim-Subscription-Key",key);

    xhttp.onload = function() {
      if (xhttp.status == 200) {
        resolve(JSON.parse(xhttp.responseText));
      }
      else {
        reject(error);
      }
    };

    xhttp.onerror = function() {
      reject(Error("Network Error"));
    };

    xhttp.send(url);
  });
}
