const AlertController=require('../Controllers/alert_controller')

exports.routesConfig = (app) =>{

    app.get('/alerts',[
        AlertController.getAlerts
    ])

}