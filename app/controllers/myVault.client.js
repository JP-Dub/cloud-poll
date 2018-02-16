'use strict';
/* global $, appUrl, ajaxFunctions, Chart  */

(function () {
    var article = document.querySelector("article");
    var apiUrl = appUrl + '/poll-vault/:results';
        
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
        }
        
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
        var user = JSON.parse(data);
        
        for(var i = 0; i < user.length; i++ ) {
        $("#vaultResults").append('<li><a href="#">' + user[i].question + '</a></li>')
            }
        
        $("#vaultResults > li").on("click", function() {
            var survey = $(this).text();
            for(var i = 0; i < user.length; i++)
                if ( survey === user[i].question) {
                $("#vaultChoices").html("<h2>" + user[i].question + "</h2>");
                 
                var poll = user[i].answers;
                poll.forEach(function(val, j) {
                    $("#vaultChoices").append("<div class='voterSpace'><p class='leftSpace'>" + poll[j].options + "</p><p class='centerSpace'><input type='radio' name='vote'></p><p class='rightSpace'>votes: " + poll[j].votes + "</p></div><br>");
                    });
                $("#vaultChoices").append("<div class='voterSpace'><p class='leftSpace'></p><p class='centerSpace'><input type='submit' value='Vote' style='margin-left:-12px'></p><p class='rightSpace'></p></div>");
                } 
            });        
    }));
    
    
})();

// places "Welcome, [user]" on top navbar if signed in
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
(function() {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
    
})();*/