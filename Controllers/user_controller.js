const User=require('../Models_Node/Users')
const factory=require('./handler.factory')


exports.updateUser=factory.updateOne(User);
exports.createUser=factory.createOne(User);
exports.getUser=factory.getOne(User);
exports.deleteUser=factory.deleteOne(User);
exports.getAllUsers=factory.getAll(User);