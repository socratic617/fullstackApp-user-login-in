module.exports = function(app, passport, db) {
  
  const {ObjectId} = require('mongodb');//my string recipe ID(from monogoDB) needs to be converted into an object aka "{ObjectId}""

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
        db.collection('recipes').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {// this means that it will render my profile.ejs
            user : req.user,//showcases there usr name when logged in
            recipes: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/recipes', (req, res) => {
      console.log('POST ENDPOINT TRIGGERED')
      console.log(req.body)
      db.collection('recipes').save(
        {
          title: req.body.title, 
          recipeContent: req.body.recipeContent, 
          spirit: req.body.spirit, 
          image: req.body.image, 
          creatorId: ObjectId(req.body.creatorId),
          reactions:{}
        }, 
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/recipes', (req, res) => {
  
      console.log(" (put method) : ")
      console.log(req.body)

  //     let startCounterThumbUp = 0;


  //     if(req.body.thumbUp !== undefined){
  //     console.log("thumb up selected")
  //     startCounterThumbUp  = req.body.thumbUp == null ? 0 : req.body.thumbUp + 1;//ternary deals with like to handle "NaN" aka null in JS deal with it by adding 1 to it or setting the new list item to 0
    
  //   } else if(req.body.thumbDown !== undefined ){

  //     console.log("thumb down(before): " + req.body.thumbDown)
  //     startCounterThumbUp = req.body.thumbDown == null ? 0 : req.body.thumbDown - 1;
  //     console.log("thumb down(after): " + startCounterThumbUp)

  //  //ternary deals with dislike to handle "NaN" aka null in JS deal with it by subtract 1 to it or setting the new list item to 0
  //     console.log("user selected thumb down");
  //   }
  //     db.collection('recipes')
  //     .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
  //       $set: {
  //         thumbUp:startCounterThumbUp,
  //       }
  //     }, {
  //       sort: {_id: -1},
  //       upsert: true
  //     }, (err, result) => {
  //       if (err) return res.send(err)
  //       res.send(result)
  //     })
    })

    app.delete('/recipes', (req, res) => {
      console.log("delete method" , req.body)
      db.collection('recipes').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Recipe deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {// checks to see if user is logged in
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
