var path = process.cwd(),
    bP = require('body-parser'),
    urlEncPar = bP.urlencoded({extended: true}),
    check = require('../controllers/serverData');
    //'./app/controllers/dataController.client');

module.exports = function(app, passport) {
    app.set("json spaces", 2);
  
  	function isLoggedIn (req, res, next) {
		  if (req.isAuthenticated()) {
			  return next();
		  } else {
			  res.redirect('/');
		  }
	  }

    app.route('/')
        .get(function(req, res) {
          res.sendFile(path + '/public/index.html');
        });
        
    app.route('/poll-creation')
        .get( function(req, res, next) {
          res.sendFile(path + '/public/poll-creation.html'); 
        }); 
        
    app.route('/poll-vault')
        .get(function(req, res) {
          res.sendFile(path + '/public/poll-vault.html');
        });
        
    app.route('/signup')
        .get(function(req, res) {
          res.sendFile(path + '/public/signup.html');
        });
        
    app.route('/poll-vault/:user')
        .get(function(req, res) {
            check(req.params.user, '/poll-vault/:user', null, function(results) {
                //console.log(results)
                res.json(results)
            });
        })

    app.route('/poll/:results')
        .get(function(req, res) {
            if(!req.user) {
                check(null, req.path, null, function(results) {
                    res.json(results)  
                });
            } else {
            res.json(req.user.poll)
            }
        })
        .post(urlEncPar, function(req, res) {
            check(req.user, req.path, req.body, function(results) {
                res.json(results);   
            });
        }) //not currently implemented
        .put(urlEncPar, function(req, res) {
            console.log(".put is being called")
            check(req.user, req.path, req.body, function(results) {
                res.json(results);   
            });
        });
       
    app.route('/signup/:user')
        .post(urlEncPar, function(req, res) {
            check(null, req.path, req.body, function(results) {
                res.json(results);
            }); 
        });
        
	app.route('/api/:user')
		.get(isLoggedIn, function (req, res) {
		    if(req.user.signin.displayName) {
		        var user = req.user.signin;
		    } else
		    if(req.user.github.displayName) {
		        user = req.user.github;
		    }
		res.json(user);
		});        
       
    app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/poll-creation',
			failureRedirect: '/'
		})); 
	/*	
	app.route('/auth/login')
	    .post(urlEncPar, passport.authenticate('local', { 
	        failureRedirect: '/'
	    }), function(req, res) {
	        res.redirect('/poll-creation');
	    });
      */  
    app.route('/auth/login')
        .post(urlEncPar, function(req, res, next) {
            passport.authenticate('local', function(err, user, info) {
                if(err) return next(err);
                
                if(!user) return res.json(info);
                req.logIn(user, function(err) {
                    if(err) return next(err);
                    return res.redirect('/poll-creation');
                });
            }) (req, res, next);
        });
        
    app.route('/logout')
        .get( function(req, res) {
            req.logout();
            res.redirect('/');
        });
};

/*      
    app.route('/poll-creation/:saved')    
        .post( urlEncPar, function(req, res) {
        //console.log("check it" , req.body)
        check(req.user, req.path, req.body, function(results) {
            console.log(results)
            res.json(results)
            });  
        });
*/


/*        
    app.route('/poll-creation/data')
        .get( function(req, res) {
         check(req.user, req.path, null, function(results) {
            res.json(results)
            })
        }); 
*/  

/*    
    app.route('/cast-vote')
        .post(urlEncPar, function(req, res) {
            console.log(req.body,"body", req.query, req.search )
            check(req.query, req.path, req.body, function(results) {
            res.json(results);
            });
        })
*/  



 /* 
  app.get('/signin', function(req, res) {
      res.sendFile(path + '/public/signin.html');
  })   
    .post( '/signup', urlEncPar, function(req, res, results) {
    var form = req.body,
        email = form.email,
        password = form.password,
        err = "";
    
    if(email === "database" && password === "database") {
      res.redirect('/poll');
    }   
    res.send(err);  
  });
  */
  
 /*
 console.log(req.path)
   var reg = /(^\w)(.+)($\b|.)/g;
   var form = req.body,
       answers = form.answers,
       question = form.question;
   console.log(answers, question)
   function repairSent(match, p1, p2) {
     return p1.toUpperCase() + p2.toLowerCase();
   }
    
   var results = question.replace(reg, repairSent) + "?";
   if(results) {
     next();
 }*/
  
   /*
    var regEx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
    var form = req.body,
        email = form.email,
        password = form.password;
    
    if(email !== "" && !email.match(regEx)) {
      res.send("Your email doesn't appear valid.");  
    } else
    if(password !== form.confirm || password === "" && password.length >= 4) {
      res.send("Your password doesn't match or isn't long enough, please try again.");
    } else {
      //err = "Your email and password have been saved.";
      res.redirect('/poll-creation');
    }   
    */  
    
/*
    .post('/signup', passport.authenticate('local', { 
      successRedirect: '/poll-creation',
      failureRedirect: '/signup',
      failureFlash: true})
          );*/    