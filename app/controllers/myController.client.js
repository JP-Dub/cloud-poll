'use strict';
/* global $, appUrl, ajaxFunctions  */

// highlights the form input on focus and add additional options on poll-creation page
(function () {

var options = document.getElementById("options-btn");
options.addEventListener("click", function() {
    $("ol").append("<li>Option:</li><input type='text' name='answers' size='40'>");
    });

$('input').on("focusin", function() {
    $(this).css("backgroundColor", "#ccffcc");
    });

$('input').on("focusout", function() {
    $(this).css("backgroundColor", "");
    });  
   
})();

// places "Welcome, [user]" on top navbar
(function (){
    var displayName = document.querySelector("#nav-welcome"),
        apiUrl = appUrl + '/api/:user';
   
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = "Welcome, " + data[userProperty];
        }

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var userObject = JSON.parse(data);
      
        if (userObject.displayName !== null) {
            updateHtmlElement(userObject, displayName, 'displayName');
        } else {
            updateHtmlElement(userObject, displayName, 'username');
        }
    }));
})();


/*
(function (){
    var displayName = document.querySelector("#postResults"),
        apiUrl = appUrl + '/poll-creation/:saved';
    //var form = document.forms.namedItem("cloudPoll");
    var form = document.getElementById("submit-btn")
    
    form.addEventListener("click", function (ev) {
        $.ajax({method: 'POST', url: apiUrl}).done(function(data) {
            alert("done")
            console.log(data)
        })
     /*   
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
            alert("whoa")
            if(data) {
                var userObject = JSON.parse(data);
                displayName.innerHTML = JSON.stringify(userObject);
            } else {
                displayName.innerHTML = "nothing to see here";
            }

        }));//
        ev.preventDefault();
    });
})();
*/
/*
(function() {
    setTimeout(function(){
    var Url = appUrl + '/poll-creation/:save';
    var form = document.forms.namedItem("cloudPoll");
    form.addEventListener('submit', function(ev) {
        $.get(Url, function(res){
       $("#postResults").html(JSON.stringify(res));
        alert( "success" );
        $("#postResults").html(res);
})
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
  })
    }, 500);
  
})();
/*
(function(){
var Url = appUrl + '/poll-creation/:save';
var form = document.forms.namedItem("cloudPoll");
form.addEventListener('submit', function(ev) {

  var oOutput = document.querySelector("#postResults"),
      oData = new FormData(form);

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", Url, true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
    }
  };

  oReq.send(oData);
  ev.preventDefault();
}, false);
})();/*

/*
//setTimeout(function(){ 
//var submit = document.getElementById("submit-btn");
var form = document.forms.namedItem("cloudPoll");

form.addEventListener("submit", function () {
    $.ajax({url: '/poll-creation/:save', method: "POST"}).done(function(results){
        var data = results;
           
        $("#status").html(data.message);
        $("#question").html(data.Question);
        for(var i = 0; i < data.Answers.length; i++) {
            $("#answers").append(data.Answers[i] + "<br>");
            }
        });
})*/
//}, 1000);


/*
(function (){
    var question = document.querySelector("#resultQuestion");
    var apiUrl = appUrl + '/poll-creation';
    
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data;//[userProperty];
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (req) {
        //var userObject = JSON.parse(req);
        var user = req[0],
            form = req[1];
        
     var error = ""; 
     
        if(form.question === "") {
             error = "You forgot to write your question!";
            updateHtmlElement(error, question, "question") ;
           //forward("You forgot to write your question");
        } else 
        if (form.answers[0] === "" || form.answers[1] === "") {
            error = "You forgot to provide some choices";
            updateHtmlElement(error, question, "question");
        }
        
    }));
})();
*/

//var displayName = document.querySelector("form input[name='displayname']");
//console.log(displayName)

/*
var submit = document.getElementById("submit-btn"),
    form = document.getElementsByTagName("input"); 

if('/poll-creation' == window.location.pathname) {
    form = document.getElementById("poll-crea-ques-form");  
    } 

form.addEventListener("focusin", function( event ) {
    event.target.style.background = "#ccffcc";    
    }, true);

form.addEventListener("focusout", function( event ) {
    event.target.style.background = "";    
    }, true);
  */