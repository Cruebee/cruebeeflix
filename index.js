const express = require('express'),
  morgan = require('morgan'),
  app = express(),
  bodyParser = require('body-parser');
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  require('./passport'),
  cors = require('cors'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User,
  Directors = Models.Director,
  Genres = Models.Genre;

const { check, validationResult } = require('express-validator');


mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

// use CORS:
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){// If a specific origin isn't found on the list of allowed Origins
      var message = 'The CORS policy for this application doesn\'t allow acces from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// use morgan to log URL access
app.use(morgan('common'));

// use express.static to return all static files within 'public' folder
app.use(express.static('public'));

// initialize the body-parser module
app.use(bodyParser.json());

// import "auth.js" file.
var auth = require('./auth')(app);

// add in error handler: (figure out how to make the error handler communicate the cause of error i.e., username/password/email are required.)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});

// add in the GET requests


app.get('/', function(req, res) {
  res.send('Welcome to My-Flix!');
});

// ------ Movies ------
// get a JSON list of ALL movies:
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// get data about a single movie, by its title:
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// ------ Genres ------
// Get a list of genres:
app.get('/genres', passport.authenticate('jwt', { session: false }), function(req, res) {
  Genres.find()
  .then(function(genres) {
    res.status(201).json(genres);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get data from a specific genre by name:
app.get('/genres/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
  Genres.findOne({ Name : req.params.Name })
  .then(function(genre) {
    res.json(genre);
  })
  .catch(function(err) {
    console.error(err);
  });
});

// ------ Directors ------
// Get a list of ALL directors:
app.get('/directors', passport.authenticate('jwt', { session: false }), function(req, res) {
  Directors.find()
  .then(function(directors) {
    res.status(201).json(directors);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});
// Get the data about a Director by name:
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
  Directors.findOne({ Name : req.params.Name })
  .then(function(director) {
    res.json(director);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// ------ Users ------
//GET all users:
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// GET a user by Username:
app.get('/users/:Username', passport.authenticate('jwt', { session : false }), function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Add a user:
/* We'll expect JSON in this format
{
ID : Integer,
Username : String,
Password : String,
Email : String,
Birthday: Date
}*/
app.post('/users',
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required.').not().isEmpty(),
  check('Email', 'Email does not appear to be valid.').isEmail()], (req, res) => {
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({Username: req.body.Username }) // search to see if user with requested username already exists
  .then(function(user) {
    if (user) {
      //if the user is found, send a response that it already exists.
      return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user); })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + err);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + err);
  });
});


// allow users to delete account by Username:
app.delete('/users/:Username', passport.authenticate('jwt', { session : false }), function(req,res) {
  Users.findOneAndRemove({ Username : req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found!");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// Update info of a user by ID:
app.put('/users/:Username', passport.authenticate('jwt', { session : false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {$set :
    {
      Username : req.body.Username,
      Password : req.body.Password,
      Email : req.body.Email,
      Birthday : req.body.Birthday
    }},
    {new : true},//This line makes sure the updated doc is returned
    function(err, updatedUser) {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
  });
  // allow users to add favorite movies to their account:
  app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session : false }), function(req, res) {
    Users.findOneAndUpdate({ Username : req.params.Username },
      { $push : { FavoriteMovies : req.params.MovieID }},
      { new : true },
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
    });

    // Remove movie from favorites list:
    app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session : false }), function(req, res) {
      Users.findOneAndUpdate({ Username : req.params.Username },
      {$pull : { FavoriteMovies : req.params.MovieID }},
      {new : true},
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      });
    });


    // listen for requests
    app.listen(8080, () =>
    console.log('My-Flix is listening on port 8080.')
  );
