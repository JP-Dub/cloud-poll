var User = require('../models/users');
var passport = require('passport'),
    LocalStrategmy = require('passport-local').Strategy;

module.exports = function(user, path, form, forward) {
    var regEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    var reg = /(^\w)(.+)($\b|.)/g;
    var choice = [],
        question = ""; 
     
    function repairSent(match, p1, p2) {
        return p1.toUpperCase() + p2.toLowerCase();
    }
     
    function process(a, q, done) {    
        question = q.replace(reg, repairSent) + "?";
       
        a.forEach( function(val) {
            if(val !== "") {
                choice.push( val.replace(reg, repairSent) );
            }
        });
    done(question, choice);
    }

    /*
    User.find({displayName: ""}), null, function(err, docs) {
        if(err) return console.error(err);
        console.log("docs" , docs)
    }*/
    /*
    var query = User.find({}).select({"_id": 1 ,"poll" : 1, "github": 1})
    //var query = User.find({}).remove({ "_id": "5a85d11cd3eb7c0bfb17ff42"})// , "_id": "5a7cb4cdf6ffb114e45ebf86"}) //, "_id": "5a7cc27c30c3ab1638c01f97" })
    .exec(function (err, user) {
        if(err) return console.error(err);
        console.log(user)
    })*/
    
    if(path === '/poll-creation/:saved') {
        var ans = form.answers, 
            quest = form.question;
              
        process(ans, quest, function(question, choice) {
           // if(question) {
            /*          
            User.findOneAndUpdate({ "github" : user.github })
                .exec(function (err, user) {
                if(err) return console.error(err);
                console.log("user to update", user)
                
                //var user = new User();
                //var user = Object.create({poll:[]});
                var Poll = user.poll;
                Poll.push({question: question, answers: []});
                choice.forEach(function(val, i) {
                    Poll[Poll.length-1].answers.push({options: choice[i], votes: 0})
                    })  
                    
                    user.save(function (err) {
                        if(err) return console.error(err)
                            return console.log(user);
                    });
                }) */
                
           return forward({"message": "Your message has been saved!","Question": question,  "Answers": choice});
            });
       // return forward({"message": "Your message has been saved!","Question": question,  "Answers": options});
    }
    
  
    if(path === '/signup/user') {
        var displayName = form.displayname,
            email = form.email,
            password = form.password;
      
        if(email !== "" && !email.match(regEx)) {
            forward({ "Error" : "Your email doesn't appear valid." });  
        } else
        if(password.length < 4 || password !== form.confirm || password === "") {
            forward({ "Error" : "Your password doesn't match or isn't long enough, please try again." });
        } else {
            User.findOne({"signin.displayName": displayName} , function(err, user) {
                if(err) return console.error(err);
                
                if (user) {
                    return forward(null, '/');
                } else {
                  
                    var currentTime = new Date(Date.now()).toString(),
                        newUser = new User();
                        newUser.date.time = currentTime;
                        newUser.signin.displayName = displayName;
                        newUser.signin.email = email || null;
                        newUser.signin.password = password;
                    
                        newUser.save(function (err) {
                            if(err)return console.error(err);
                            console.log(newUser, "newUser")
                        })
                };
            });
        return forward(null, '/poll-creation');
        } //end of else statement 
    }
    
    if(path === '/poll-vault/:results') {
        
        User.find({}).select({"_id" : 1, "poll": 1, "question" : 1})
        .exec(function(err, user) {
            if(err) return console.error(err);
                
            if (user) {
               var newUser = user[0].poll;
               var results = [];
                newUser.forEach( function(val, i) {
                  results.push(newUser[i]); 
                })    
               //console.log(user[0].poll, "user")
               //console.log(results);
               forward(results)
            }
        })
    }
    
};
/*
        passport.use(new LocalStrategy( function(displayName, password, done) {
            User.findOne({ 'signin.displayName' : displayName }, function(err, user) {
                console.log(displayName, password)
                if (err) { return done(err); }
                if(!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if(!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                } 
                
                return done(null, user);
                })
            }
        ));
*/