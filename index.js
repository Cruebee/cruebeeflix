const express = require('express'),
  morgan = require('morgan'),
  app = express(),
  bodyParser = require('body-parser');
  uuid = require('uuid');

let users = [
  {
    id: '0',
    name: 'Crue',
    username: 'cruebee',
    password: '',
    email: '',
    birthday: '',
    favorites: ['6']
  }
];

let movies = [ {
  id: '0',
  title: 'The Matrix',
  author: 'Sophia Stewart',
  screenwriter: 'Lana Wachowski and Lilly Wachowski',
  year: '1999',
  description: '',
  genre: 'SciFi',
  director: 'Lana and Lilly Wachowski'
},
  {
  id: '1',
  title : 'Harry Potter and the Sorcerer\'s Stone',
  author : 'J.K. Rowling',
  screenwriter: 'Steve Kloves',
  year: '2001',
  description: '',
  genre: 'Fantasy',
  director : 'Chris Columbus'
},
{
  id: '3',
  title : 'Lord of the Rings',
  author : 'J.R.R. Tolkien',
  screenwriter: 'Peter Jackson, Philippa boyens, and Fran Walsh',
  year : '2001',
  description: '',
  genre: 'Fantasy',
  director: 'Peter Jackson'
},
{
  id: '4',
  title: 'Jurassic Park',
  author: 'Michael Crichton',
  screenwriter: 'Michael Crichton and David Koepp',
  year: '1993',
  description: '',
  genre: 'SciFi',
  director: 'Steven Spielberg'
},
{
  id: '5',
  title : 'Star Wars',
  author: 'George Lucas',
  screenwriter: 'George Lucas',
  year: '1977',
  description: '',
  genre: 'Fantasy',
  director: 'George Lucas'
},
{
  id: '6',
  title: 'The lord of the Rings',
  author: 'J.R.R. Tolkien',
  screenwriter: 'Chris Conkling, Peter S. Beagle',
  year: '1978',
  description: '',
  genre: 'Fantasy',
  director: 'Ralph Bakshi'
},
{
  id: '7',
  title: 'The Dark Knight',
  author: 'Christopher Nolan and David S. Goyer',
  screenwriter: 'Jonathan and Christopher Nolan',
  year: '2008',
  description: '',
  genre: 'Fantasy',
  director: 'Christopher Nolan'
},
{
  id: '8',
  title: 'Joker',
  author: 'Based on characters by: Bob Kane, Bill Finger, and Jerry Robinson',
  screenwriter: 'Todd Phillips and Scott Silver',
  year: '2019',
  description: '',
  genre: 'Fantasy',
  director: 'Todd Phillips'
},
{
  id: '9',
  title: 'The Boondock Saints',
  author: 'Troy Duffy',
  screenwriter: 'Troy Duffy',
  year: '1999',
  description: '',
  genre: 'Action',
  director: 'Troy Duffy'
},
{
  id: '10',
  title: 'Donnie Darko',
  author: 'Richard Kelly',
  screenwriter: 'Richard Kelly',
  year: '2001',
  description: '',
  genre: 'Thriller',
  director: 'Richard Kelly'
},
];

let directors = [
  {
    name: 'Chris Columbus',
    bio: '',
    age: ''
  },
  {
    name: 'George Lucas',
    bio: '',
    age: ''
  },
  {
    name: 'Lana Wachowski',
    bio: '',
    age: ''
  },
  {
    name: 'Lilly Wachowski',
    bio: '',
    age: ''
  },
  {
    name: 'Peter Jackson',
    bio: '',
    age: ''
  },
  {
    name: 'Ralph Bakshi',
    bio: '',
    age: ''
  },
  {
    name: 'Richard Kelly',
    bio: '',
    age: ''
  },
  {
    name: 'Steven Spielberg',
    bio: '',
    age: ''
  },
  {
    name: 'Todd Phillips',
    bio: '',
    age: ''
  },
  {
    name: 'Troy Duffy',
    bio: '',
    name: ''
  }
];

let genres = [
  {
    name: 'SciFi',
    description: 'SciFi (Sci-fi, or SF), also known as Science Fiction is a genre of fictitious entertainment whose content is imaginitive, but based in science. It relies heavily on scientific facts, theories, and principles as support for its settings, characters, themes, and plot lines, which is what distinguishes it from the realm of fantasy.'
  },
  {
    name: 'Thriller',
    description: 'Thrillers encompas a wide variety of films. Their primary distinguishing feature is that they induce strong feelings of excitement, anxiety, tension, suspense, fear, or similar emotions in a viewer. This could be a scary movie, or a movie with many plot twists, that may "stress out" audience members, by design.'
  },
  {
    name: 'Fantasy',
    description: 'Fantasy is a form of entertainment, in which a plot cannot occur in the "real world". The plot will often involve witchcraft or magic in some form, taking place on an undiscovered planet of an unknown world, OR sometimes alternate realities/worlds that seem similar to our world, but with physical limitations that go directly against known scientific fact/theory/hypotheses.'
  },
  {
    name: 'Action',
    description: 'An action film is associated with physical action, where the physical action often outweighs the storytelling. These films are often associated with continuous motion and action including physical stunts, chases, fights, battles, and racing. The story usually revolves around a Hero of some kind, who generally follows the typical "Hero\'s Journey".'
  },
  {
    name: 'Comedy',
    description: 'Comedy films are associated with the type of work that is amusing and satirical. Comedies are mostly having a cheerful ending. Tragedy is the opposite to a comedy, as tragedy deals with sorrowful and tragic events in a story.'
  }
]

// use morgan to log URL access
app.use(morgan('common'));

// use express.static to return all static files within 'public' folder
app.use(express.static('public'));

// initialize the body-parser module
app.use(bodyParser.json());

// add in error handler:
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
app.get('/movies', function(req, res) {
  res.json(movies)
});

// get data about a single movie, by its title:
app.get('/movies/:title', (req, res) => {
  res.json(movies.find( (movie) => { return movie.title.toLowerCase().includes(req.params.title.toLowerCase()); }));
});

// ------ Genres ------
// Get a list of genres:
app.get('/genres', function(req, res) {
  res.json(genres)
});

// Get data from a specific genre by name:
app.get('/genres/:name', (req, res) => {
  res.json(genres.find( (genre) => {return genre.name.toLowerCase() === req.params.name.toLowerCase(); }));
});

// ------ Directors ------
// Get a list of ALL directors:
app.get('/directors', (req, res) => {
  res.json(directors);
})
// Get the data about a Director by name:
app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) => {return director.name.toLowerCase() === req.params.name.toLowerCase(); }));
});

// ------ Users ------
//get a list of All users:
app.get('/users', (req, res) => {
  res.json(users);
});

// allow adding of new users:
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body.';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// allow users to delete account by ID:
app.delete('/users/:id', (req, res) => {
  let user = users.find( (user) => {return user.id === req.params.id; });

  if (user) {
    users = users.filter(function(obj) {return obj.id !== req.params.id; });
    res.status(200).send('User ' + user.id + ' with ID ' + req.params.id + ' was deleted.');
  }
});

// get user from list by username:
app.get('/users/:username', (req, res) => {
  res.json(users.find( (user) => {return user.username === req.params.username; }));
});


// Update info of a user by ID:
app.put('/users/:id', (req, res) => {
  let user = users.find( (user) => {return user.id === req.params.id; });
  let newUserInfo = req.body;

  if (user && newUserInfo) {
    //keep existing user ID:
    newUserInfo.id = user.id;
    //keep existing user favorites:
    newUserInfo.favorites = user.favorites;
    //merges old ifo with new info:
    Object.assign(user, newUserInfo);
    //merge updated info into the existing list of users:
    users = users.map((user) => (user.id === newUserInfo.id) ? newUserInfo : user);
    res.status(201).send(user);
  } else if (!newUserInfo.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});

// allow users to add favorite movies to their account:
app.post('/users/:id/:movie_id', (req, res) => {
  let user = users.find( (user) => {return user.id === req.params.id; });
  let movie = movies.find( (movie) => {return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
    res.status(201).send('Movie has been added to favorites!');
  } else if (!movie) {
    res.status(404).send('Movie with the id: ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id: ' + req.params.id + ' was not found.');
  }
});

// Remove movie from favorites list:
app.delete('/users/:id/:movie_id', (req, res) => {
  let user = users.find( (user) => {return user.id === req.params.id; });
  let movie = movies.find( (movie) => {return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = user.favorites.filter( (movie_id) => {return movie.id !== req.params.movie_id; });
    res.status(200).send('Movie has been removed from favorites!');
  } else if (!movie) {
    res.status(404).send('Movie with id: ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id: ' + req.params.id + ' was not found.');
  }
});


// listen for requests
app.listen(8080, () =>
  console.log('My-Flix is listening on port 8080.')
);
