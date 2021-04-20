const UsersController=require('../Controllers/user_controller');
const AuthController=require('../Controllers/authentication/auth_controller')
const verifyUser=require('../Controllers/authentication/verifyUser.middleware')

exports.routesConfig = (app) =>{
 
    app.post('/CreateUser', [
        UsersController.createUser
     ]);

     app.post('/login',[
        verifyUser.hasAuthFields,
        verifyUser.isPasswordandUserMatch,
        AuthController.login
     ]);

    app.get('/users/:id',[
   //   ValidationMiddleware.validJWTNeeded,
      UsersController.getUser
   ]);
  
  
  app.get('/users/',[
     // ValidationMiddleware.validJWTNeeded,
      UsersController.getAllUsers
  ]);

  app.delete('/deleteUser/:id',[
      verifyUser.isAdmin,
      UsersController.deleteUser
  ])

}