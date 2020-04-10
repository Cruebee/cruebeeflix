const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  Director: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }],
  ImagePath: String,
  Featured: Boolean
});

var directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String},
  Birth: String,
  Death: String
});

var genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

var userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

var Movie = mongoose.model('Movie', movieSchema);
var Director = mongoose.model('Director', directorSchema);
var Genre = mongoose.model('Genre', genreSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.User = User;
