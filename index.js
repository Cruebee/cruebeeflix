const express = require('express'),
  morgan = require('morgan'),
  app = express();

var myLogger = function (req, res, next) {
  console.log(req.url + 'URL has been logged.');
  next();
};


let topMovies = [ {
  title : 'Harry Potter and the Sorcerer\'s Stone',
  author : 'J.K. Rowling',
  screenwriter: 'Steve Kloves',
  year: '2001',
  director : 'Chris Columbus',
  fanWisdom: 'Did you know that the Dementors are based on J.K. Rowling\'s struggle with depression after her mothers death? Rowling\'s mother suffered from M.S. and passed in 1990, after which Rowling struggled with depression. She used the experience to characterize the creatures that sucked the happiness from their victims, a qote from Rowling, "Dementors are among the foulest creatures that walk this earth. They infest the darkest, filthiest places, they glory in decay and despair, they drain peace, hope, and hapiness out of the air around them. Even Muggles feel their presence, though they can\'t see them. Get too near a Dementor and every good feeling, every happy memory will be sucked out of you. If it can, the Dementor will feed on you long enough to reduce you to something like itself - soul-less and evil. You\'ll be left with nothing but the worst experiences of your life."'
},
{
  title : 'Lord of the Rings',
  author : 'J.R.R. Tolkien',
  screenwriter: 'Peter Jackson, Philippa boyens, and Fran Walsh',
  year : '2001',
  director: 'Peter Jackson',
  fanWisdom: 'Did you know that there are 5 Wizards in the world of the Lord of the Rings, and they are part of a race called the Maiar, who can actually change forms!!! This means that while Gandalf was a strong character that fans fell in love with, he actually would have appeared differently (not always as Ian McKellen), to some of the characters in the movie! Really puts a new spin on trusting the Wizards, and shows you why it was so easy for people to distrust Gandalf at first.'
},
{
  title : 'Twilight',
  author : 'Stephanie Meyer',
  screenwriter: 'Melissa Rosenberg',
  director : 'Catherine Hardwicke',
  fanWisdom: 'Did you know that Edward\'s character wasn\'t always supposed to be so "dark and stormy", Edward was in fact, almost fired for making the character so "emo".'
},
{
  title : 'Star Wars',
  author: 'George Lucas',
  screenwriter: 'George Lucas',
  year: '1977',
  director: 'George Lucas',
  fanWisdom: 'The novelization of the first film (Star Wars: a New Hope) was published in December 1976, six months before the film was released. The credited author was George Lucas, however the book was revealed to have been "ghost written" by Alan Dean Foster, who later wrote the first Expanded Universe novel, "Splinter of the Mind\'s Eye"',
},
]

// GET requests and use (myLogger)
// by invoking the app.use(); function on the myLogger(); middleware function before specifying the routes for the root path ("/") and the sub-URLs ("/movies", "/documentation"), you're designating that myLogger(); should ve called with every request--all requests to the root URl and "/movies" and "/documentation".
// By using middleware to apply the same logic to all requests, you eliminate the need for each route to boast it's own separate consol.log statements
app.use(myLogger);
app.use(morgan('common'));

app.get('/', function(req, res) {
  res.send('Welcome to my-Flix club!')
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root : __dirname });
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});


// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
