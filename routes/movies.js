var express = require('express')
var router = express.Router()
var Movie = require('../models/model')

// All the GET requests
router.get('/', function (req, res) {
  // all movies view under INDEX.EJS



  Movie.find( {}, function(err, movieArr) {
    if (err) throw new Error(err)

    console.log(movieArr)


    res.render('movies/index', {
      movieArr: movieArr,
      name: 'ASSSSSSSSSSSS'
    })


  })




}).get('/new', function (req, res) {
  // NEW route under NEW.EJS
  res.render('movies/new')

}).get('/:id', function (req, res) {
  res.send('movie\'s ' + req.params.id + ' details')

}).get('/:id/edit', function (req, res) {
  res.send('edit movie\'s ' + req.params.id + ' details')
})




//post
router.post('/', function (req, res) {

  var newMovie = new Movie ({
    name: req.body.newmovie.name,
    year: req.body.newmovie.year
  })

  newMovie.save(function (err) {
    if (err) throw new Error(err)
  })

  res.send(req.body)

  // var bodyName = req.body.name
  // var bodyYear = req.body.year
  // res.send("name and year is " + bodyName + " " + bodyYear)
})

// put
router.put('/:id', function (req, res) {
  res.send('movie '+req.params.id + ' updated')
})

// delete
router.delete('/:id', function (req, res) {
  res.send('deleted movie ' + req.params.id)
})


module.exports = router
