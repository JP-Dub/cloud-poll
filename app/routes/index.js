var path = process.cwd(),
    bP = require('body-parser'),
    urlEncPar = bP.urlencoded({extended: true}),
    check = require('../controllers/dataController.server');
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
        .get(isLoggedIn, function(req, res, next) {
          res.sendFile(path + '/public/poll-creation.html'); 
        }) 
        
    app.route('/poll-creation/:saved')    
        .post(isLoggedIn, urlEncPar, function(req, res) {
            check(req.user, req.path, req.body, function(results) {
                res.redirect('/poll-creation')
                });  
        });
  
    app.route('/poll-vault')
        .get( function(req, res) {
          res.sendFile(path + '/public/poll-vault.html');
        })
    
    app.route('/poll-vault/:results')
        .get(function(req, res) {
            check(req.user, req.path, null, function(results) {
            //console.log("ctrl results", results )
            res.json(results)    
            })
            
        });
        
  
    app.route('/signup')
        .get(function(req, res) {
          res.sendFile(path + '/public/signup.html');
        });
       
    app.route('/signup/user')
        .post(urlEncPar, function(req, res) {
            check(null, req.path, req.body, function(err, results) {
                if (err) return res.json(err);
                res.redirect(results);
            }); 
        });
        
	app.route('/api/:user')
		.get(isLoggedIn, function (req, res) {
		    console.log("called, api/:user")
			res.json(req.user.github);
		});        
       
    app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/poll-creation',
			failureRedirect: '/'
		})); 
		
	app.route('/login')
	    .post(passport.authenticate('local', { 
	        successRedirect: '/poll-creation',
	        failureRedirect: '/',
	        failureFlash: true 
	    }));
        
};

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