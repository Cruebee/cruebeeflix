const express = require('express'),
  morgan = require('morgan'),
  app = express();

let topMovies = [ {
  title: 'The Matrix',
  author: 'Sophia Stewart',
  screenwriter: 'Lana Wachowski and Lilly Wachowski',
  year: '1999',
  director: 'Lana and Lilly Wachowski'
},
  {
  title : 'Harry Potter and the Sorcerer\'s Stone',
  author : 'J.K. Rowling',
  screenwriter: 'Steve Kloves',
  year: '2001',
  director : 'Chris Columbus'
},
{
  title : 'Lord of the Rings',
  author : 'J.R.R. Tolkien',
  screenwriter: 'Peter Jackson, Philippa boyens, and Fran Walsh',
  year : '2001',
  director: 'Peter Jackson'
},
{
  title: 'Jurassic Park',
  author: 'Michael Crichton',
  screenwriter: 'Michael Crichton and David Koepp',
  year: '1993',
  director: 'Steven Spielberg'
},
{
  title : 'Star Wars',
  author: 'George Lucas',
  screenwriter: 'George Lucas',
  year: '1977',
  director: 'George Lucas'
},
{
  title: 'The lord of the Rings',
  author: 'J.R.R. Tolkien',
  screenwriter: 'Chris Conkling, Peter S. Beagle',
  year: '1978',
  director: 'Ralph Bakshi'
},
{
  title: 'The Dark Knight',
  author: 'Christopher Nolan and David S. Goyer',
  screenwriter: 'Jonathan and Christopher Nolan',
  year: '2008',
  director: 'Christopher Nolan'
},
{
  title: 'Joker',
  author: 'Based on characters by: Bob Kane, Bill Finger, and Jerry Robinson',
  screenwriter: 'Todd Phillips and Scott Silver',
  year: '2019',
  director: 'Todd Phillips'
},
{
  title: 'The Boondock Saints',
  author: 'Troy Duffy',
  screenwriter: 'Troy Duffy',
  year: '1999',
  director: 'Troy Duffy'
},
{
  title: 'Donnie Darko',
  author: 'Richard Kelly',
  screenwriter: 'Richard Kelly',
  year: '2001',
  director: 'Richard Kelly'
},
]

// GET requests and use (myLogger)
// by invoking the app.use(); function on the myLogger(); middleware function before specifying the routes for the root path ("/") and the sub-URLs ("/movies", "/documentation"), you're designating that myLogger(); should ve called with every request--all requests to the root URl and "/movies" and "/documentation".
// By using middleware to apply the same logic to all requests, you eliminate the need for each route to boast it's own separate consol.log statements
app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Welcome to my-Flix club!')
});
app.get('/movies', function(req, res) {
  res.json(topMovies)
});


// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
