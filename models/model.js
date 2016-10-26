
var mongoose = require('mongoose')

var newSchema = new mongoose.Schema({
  name: String,
  year: Number
})

var Movie = mongoose.model('Movie', newSchema)

module.exports = Movie
