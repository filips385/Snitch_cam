const Alert=require('../Models_Node/Alerts')
const factory=require('./handler.factory')



exports.createAlert = factory.createOne(Alert)
exports.getAlerts=factory.getAll(Alert)