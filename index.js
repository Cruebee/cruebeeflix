// Required libraries
const express = require('express'),
  morgan = require('morgan'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  cors = require('cors'),
  // Models
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User,
  Directors = Models.Director,
  Genres = Models.Genre,
  // Hosting 
  path = require('path');

require('/passport');

const { check, validationResult } = require('express-validator');

/*mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true}); */

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var allowedOrigins = [
  'http://localhost:8080',
  'http://testsite.com',
  'http://localhost:1234',
  'https://cruebeeflix.herokuapp.com'
];
// import "auth.js" file.
var auth = require('./auth')(app);

// use morgan to log URL access
app.use(morgan('common'));

// use express.static to return all static files within 'public' folder
app.use(express.static('public'));
// implement "/client" directory (linking app to host on Heroku)
app.use('/cruebeeflix', express.static(path.join(__dirname, 'cruebeeflix', 'dist')));
app.get('/cruebeeflix/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'cruebeeflix', 'dist', 'index.html'));
});

// initialize the body-parser module
app.use(bodyParser.json());

// use cors
app.use(cors());

// use CORS:
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn't found on the list of allowed Origins
        var message =
          'The CORS policy for this application doesn\'t allow acces from origin ' +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// add in error handler: (figure out how to make the error handler communicate the cause of error i.e., username/password/email are required.)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});

// add in the GET requests

app.get('/', function (req, res) {
  res.send('Welcome to My-Flix!');
});

// ------ Movies ------
// get a JSON list of ALL movies:
app.get('/movies',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Movies.find()
      .populate('Genre')
      .populate('Director')
      .exec(function (err, movie) {
        if (err) return console.error(err);
        res.status(201).json(movie);
      });
  });

// get data about a single movie, by its title:
app.get('/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Movies.findOne({ Title: req.params.Title })
      .populate('Genre')
      .populate('Director')
      .then(function (movie) {
        res.json(movie);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// ------ Genres ------
// Get a list of genres:
app.get('/genres',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Genres.find()
      .then(function (genres) {
        res.status(201).json(genres);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Get data from a specific genre by name:
app.get('/genres/:Name',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Genres.findOne({ Name: req.params.Name })
      .then(function (genre) {
        res.json(genre);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
);

// ------ Directors ------
// Get a list of ALL directors:
app.get('/directors',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Directors.find()
      .then(function (directors) {
        res.status(201).json(directors);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);
// Get the data about a Director by name:
app.get('/directors/:Name',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Directors.findOne({ Name: req.params.Name })
      .then(function (director) {
        res.json(director);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// ------ Users ------
//GET all users:
app.get('/users',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.find()
      .then(function (users) {
        res.status(201).json(users);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// GET a user by Username:
app.get('/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.findOne({ Username: req.params.Username })
      .populate('FavoriteMovies')
      .exec(function (err, user) {
        if (err) return console.error(err);
        res.status(201).json(user);
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
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required.').not().isEmpty(),
    check('Email', 'Email does not appear to be valid.').isEmail(),
  ],
  (req, res) => {
    // Check the Validation object for errors.
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // search to see if user with requested username already exists
      .then((user) => {
        if (user) {
          //if the user is found, send a response that it already exists.
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday,
            })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + err);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Update info of a user by Username:
app.put('/users/:Username',
  passport.authenticate('jwt', { session: false }),
  [
    check('Username', 'Username is required.').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email doesn\'t appear to be valid.').isEmail(),
  ],
  (req, res) => {
    // check validation of object for errors:
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOneAndUpdate({ Username: req.params.Username },
      {
        $set:
        {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, //This line makes sure the updated doc is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// allow users to add favorite movies to their account:
app.post('/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Remove movie from favorites list:
app.delete('/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// allow users to delete account by Username:
app.delete('/users/:Username',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(function (user) {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found!');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

// Setup listening port:
var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function () {
  console.log('Listening on Port ${port}');
});
