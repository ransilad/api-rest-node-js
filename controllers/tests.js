var mongoose = require('mongoose');  
var Test = mongoose.model('test');

//GET - Return all tests in the DB
exports.findAllTest = function(req, res) {  
    Test.find(function(err, tests) {
        if(err)
            return res.status(500).send( err.message);

        console.log(tests.length);

        if (tests.length == 1) {
            console.log(tests.name)
        } else {
            
            console.log(tests)
            /*resp.each(function(err, msg){
                console.log(msg.name)
            });*/
        }

        res.status(200).jsonp({'resp': tests});
    });
};

//GET - Return a Test with specified ID
exports.findById = function(req, res) {  
    Test.findById(req.params.id, function(err, test) {
        if(err)
            return res.status(500).send( err.message);
        res.status(200).jsonp(test);
    });
};

//POST - Insert a new Test in the DB
exports.addTest = function(req, res) {  
    var test = new Test({
        name: req.body.name
    });
    test.save(function(err, test) {
        if(err) 
            return res.status(500).send( err.message);
        res.status(200).jsonp(test);
    });
};

//PUT - Update a register already exists
exports.updateTest = function(req, res) {  
    Test.findById(req.params.id, function(err, test) {
        test.name = req.body.name;
        test.save(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).jsonp(test);
        });
    });
};

//DELETE - Delete a Test with specified ID
exports.deleteTest = function(req, res) {  
    Test.findById(req.params.id, function(err, test) {
        test.remove(function(err) {
            if(err) 
                return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
