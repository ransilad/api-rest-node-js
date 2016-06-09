var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

var url = ""
switch(process.env.NODE_ENV){
    case 'sandbox':
    	//NODE_ENV=sandbox node app.js
        url = "mongodb://user:password@server:port/db" 
        break;
    case 'production':
    	//NODE_ENV=production node app.js
        url = "mongodb://user:password@server:port/db" 
        break;
    default:
        url = "mongodb://localhost:27017/tvshow"
        break;
}

//
mongoose.connect(url, function(err, res) {  
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	}
});
require("./models/tvshow");
require("./models/test");

var TVShowCtrl = require('./controllers/tvshows');
var TestCtrl = require('./controllers/tests');

// API routes
var api = express.Router();

api.route('/tvshows')  
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

api.route('/tvshows/:id')  
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

api.route('/tests')  
  .get(TestCtrl.findAllTest)
  .post(TestCtrl.addTest);

api.route('/test/:id')  
  .get(TestCtrl.findById)
  .put(TestCtrl.updateTest)
  .delete(TestCtrl.deleteTest);

app.use('/api', api);

app.listen(3000, function() {
console.log("Node server running on http://localhost:3000");
});
