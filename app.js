var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

mongoose.connect('mongodb://MacBook-Gerson.local:27017/tvshow', function(err, res) {  
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	}
});
require("./models/tvshow");

var TVShowCtrl = require('./controllers/tvshows');

// API routes
var tvshows = express.Router();

tvshows.route('/tvshows')  
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')  
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

app.listen(3000, function() {
console.log("Node server running on http://localhost:3000");
});
