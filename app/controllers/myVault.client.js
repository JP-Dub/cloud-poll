'use strict';
/* global $, appUrl, ajaxFunctions, Chart  */
/*
(function drawChart(chart, type, choices, votes) {
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: chart[type],
        data: {
            labels: choices,
            datasets: [{
                label: '# of Votes',
                data: votes,//[12, 19, 3, 5, 2, 8],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', //red
                    'rgba(54, 162, 235, 0.2)', //blue
                    'rgba(255, 206, 86, 0.2)', //yellow
                    'rgba(75, 192, 192, 0.2)', //green
                    'rgba(153, 102, 255, 0.2)',//purple
                    'rgba(255, 159, 64, 0.2)'  //orange
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
                }],
                xAxes: []
            }
        }
    });    
    
});
*/
(function () {
   // var article = document.querySelector("article");
    var apiUrl = appUrl + '/poll-vault/:results';
    var chart = ['pie', 'bar'],
        type = 0;
        
    function drawChart(chart, type, choices, votes) {
    
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
        type: chart[type],
        data: {
            labels: choices,
            datasets: [{
                label: '# of Votes',
                data: votes,//[12, 19, 3, 5, 2, 8],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', //red
                    'rgba(54, 162, 235, 0.2)', //blue
                    'rgba(255, 206, 86, 0.2)', //yellow
                    'rgba(75, 192, 192, 0.2)', //green
                    'rgba(153, 102, 255, 0.2)',//purple
                    'rgba(255, 159, 64, 0.2)'  //orange
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
                }],
                xAxes: []
            }
        }
    });     
    }       
        
    function updateHtmlElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
        }
        
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
        var user = JSON.parse(data);
        
        for(var i = 0; i < user.length; i++ ) {
        $("#vaultResults").append('<li><a href="#">' + user[i].question + '</a></li>')
            }
        
        $("#vaultResults > li").on("click", function() {
            var survey = $(this).text(),
                choices = [],
                votes = [];
            
            for(var i = 0; i < user.length; i++) {
                if ( survey === user[i].question) {
                    $("#vaultChoices").html('<h2>' + user[i].question + '</h2>');
                 
                    var poll = user[i].answers;
                    poll.forEach(function(val, j) {
                        $("#vaultChoices").append("<div class='voterSpace'><p class='leftSpace'>" + poll[j].options + "</p><p class='centerSpace'><input type='radio' name='vote' value='" + poll[j].options + "'></p><p class='rightSpace'>votes: " + poll[j].votes + "</p></div><br>");
                            choices.push(poll[j].options);
                            votes.push(poll[j].votes);
                        });
                        $("#vaultChoices").append("<div class='voterSpace'><p class='leftSpace'></p><p id='centerSp' class='centerSpace'><button id='voterBtn' type='submit' style='margin-left:0px'>Vote</button></p><p class='rightSpace'></p></div>");
                }
            }
            
            drawChart(chart, type, choices, votes);
            
            $('#vault-header').click(function() {
                
                if(type == chart.length-1) {
                    type = 0;
                    } else {
                type += 1;
                    }
            drawChart(chart, type, choices, votes);       
            }) 
            
           
            $('#voterBtn').click(function(e) {
                var apiUrl = appUrl + '/cast-vote';
                var survey = {
                    "question" : $('#vaultChoices > h2').text(), 
                    "vote": $('input[name="vote"]:checked').val()
                    };
                    
                 $.ajax({
                    type: "POST",
                    url: apiUrl,
                    data: survey,
                    success: function(results, data) {
                       $('#data').html(results, data);
                       
                    }
                })
                e.preventDefault();
            });
          
 
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

(function() {
    var apiUrl = appUrl + '/poll-vault/:vote';
    $('#voterBtn').on('click', function() {
       var form = $('#vaultChoices');
       //alert(val)
       $.post(apiUrl, function(form) {
           console.log("success", JSON.stringify(form))
       })
        
    });
    
})();


/*
(function() {
    //var pollQuestion = document.querySelector("#vaultChoices");
    var apiUrl = appUrl + '/poll-vault/:vote';    
    
    $('#voterBtn').on('click', function() {
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
            //var user = JSON.parse(data);
            var form = $('form').serializeArray();
            alert('form')
            $('#data').html(data)
        
        }))
    })
    
})();*/