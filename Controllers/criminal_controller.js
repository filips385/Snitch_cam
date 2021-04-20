const Criminal=require('../Models_Node/Criminals')
const factory=require('./handler.factory')
bodyParser = require('body-parser');



exports.updateCriminal=factory.updateOne(Criminal);


      exports.getCriminal=factory.getOne(Criminal);
exports.deleteCriminal=factory.deleteOne(Criminal);
  exports.getAllCriminals=factory.getAll(Criminal);


