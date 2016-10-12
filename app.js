var express = require('express')

// bodyPaser for form
var bodyParser = require('body-parser')
var methodOverride = require('method-override')



var app = express()
var port = 4000

app.set('view engine', 'ejs')



var gameroutes = require('./routes/gameroutes')

// this is middleware
app.use('/', gameroutes)




var movie_routes = require('./routes/movies')


// bodyPaser form
app.use(bodyParser.urlencoded( {
  extended: true
} ) )

app.use( methodOverride() )

//middleware
app.use('/movies', movie_routes)



// this is middleware
app.use( express.static(__dirname + '/public') )


// // this is middleware
// app.get('/', function(req, res) {
//   res.render('index')
// })



app.listen(port)
console.log('Server running at http://localhost:'+port+'/')
