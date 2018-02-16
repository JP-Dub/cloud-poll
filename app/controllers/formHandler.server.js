'use strict';


(function () {
/*
   var displayName = document.querySelector('#profile-id');
   var email = document.querySelector('#profile-username') || null;
   var password = document.querySelector('#profile-repos');
 */
   var apiUrl = appUrl + '/signup/user';
   
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
      document.getElementById("signupResponse").innerHTML = "you get me";
      var userObject = JSON.parse(data);
      console.log(userObject, "userObject")
  
   }));
   
   
})();

/*
var formData = new FormData();
var formElement = document.querySelector("form");
*/