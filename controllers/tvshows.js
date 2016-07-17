var mongoose = require('mongoose');  
var TVShow  = mongoose.model('tvshow');
var Promise = require('es6-promise').Promise;

//GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res) {  

    function searchAll() {
        var result = [];
        return new Promise( function (resolve, reject) {
            TVShow.find(function(err, tvshows) {
                if(err) 
                    return reject(err);

                tvshows.forEach(function(item) {
                    result.push({
                        id: item.id,
                        title: item.title,
                        country: item.country
                    });
                });

                return resolve(result);
            });        
        });
    };

    searchAll().then(function(result) {
        console.log(result);
        res.status(200).jsonp(result);
    }).catch(function(err){
        return res.status(500).send(err);
    });

    //console.log("Paso");
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(tvshow);
    });
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function(req, res) {  
    var tvshow = new TVShow({
        title:    req.body.title,
        year:     req.body.year,
        country:  req.body.country,
        poster:   req.body.poster,
        seasons:  req.body.seasons,
        genre:    req.body.genre,
        summary:  req.body.summary
    });
    tvshow.save(function(err, tvshow) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(tvshow);
    });
};

//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
        tvshow.title   = req.body.petId;
        tvshow.year    = req.body.year;
        tvshow.country = req.body.country;
        tvshow.poster  = req.body.poster;
        tvshow.seasons = req.body.seasons;
        tvshow.genre   = req.body.genre;
        tvshow.summary = req.body.summary;
        tvshow.save(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).jsonp(tvshow);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function(req, res) {  
    TVShow.findById(req.params.id, function(err, tvshow) {
        tvshow.remove(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
