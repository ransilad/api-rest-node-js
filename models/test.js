var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var testSchema = new Schema({  
  name:    { type: String }
});

module.exports = mongoose.model('test', testSchema);
