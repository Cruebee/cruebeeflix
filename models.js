const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

// Movies Schema
var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  Director: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }],
  ImagePath: String,
  Featured: Boolean
});

// Directors Schema
var directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String},
  Birth: String,
  Death: String
});

// Genres Schema
var genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

// Users Schema
var userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

var Movie = mongoose.model('Movie', movieSchema);
var Director = mongoose.model('Director', directorSchema);
var Genre = mongoose.model('Genre', genreSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.Director = Director;
module.exports.Genre = Genre;
module.exports.User = User;
