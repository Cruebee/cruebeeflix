const express = require('express'),
  morgan = require('morgan'),
  app = express(),
  fs = require('fs'),
  path = require('path'),
  accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
  bodyParser = require('body-parser');
  uuid = require('uuid');

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

// GET requests and use (myLogger)
// by invoking the app.use(); function on the myLogger(); middleware function before specifying the routes for the root path ("/") and the sub-URLs ("/movies", "/documentation"), you're designating that myLogger(); should ve called with every request--all requests to the root URl and "/movies" and "/documentation".
// By using middleware to apply the same logic to all requests, you eliminate the need for each route to boast it's own separate consol.log statements
app.use(morgan('common', {stream: accessLogStream}));
app.use(express.static('public'));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});

app.get('/', function(req, res) {
  res.send('Welcome to my-Flix club!')
});
app.get('/movies', function(req, res) {
  res.json(movies)
});


// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
