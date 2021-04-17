const crypto=require('crypto');


exports.deleteOne = Model => (req, res, next) => {
      
  Model.findByIdAndDelete(req.params.id)
  .then(result=>{
      res.status(200).send(result)
  }).catch(err=>{console.log(err)})

}

exports.getOne=Model=>(req,res,next)=>{
    
        Model.findById(req.params.id).
        then(result=>{
            res.status(200).send({result})
        })
        .catch(err=>console.log(err))
        ;
    
}

exports.createOne=Model=>(req,res,next)=>{
    if(req.body.password){
        let salt=crypto.randomBytes(16).toString('base64');
        let hash=crypto.createHmac('sha512',salt).update(req.body.password).digest('base64');

        let password=salt + '$' + hash;
        req.body.permission=1;

        req.body.password=password;
    }

    Model.createOne(req.body).then(result=>{
        res.status(200).send({result})
        next()
    }).catch(err=>console.log(err));

}

exports.updateOne=Model=>(req,res,next)=>{

        Model.findByIdAndUpdate(req.params.id,req.body).then(
            result=>{res.status(200).send({result})}
        ).catch(err=>console.log(err));
}

exports.getAll=Model=>(req,res,next)=>{

    let query=req.query.limit && req.query.limit<=100 ? parseInt(req.query.limit):10;
    let page=Number.isInteger(req.query.page) ? req.query.page : 0;
    
    Model.list(query,page).then(result=>{
        res.status(200).send(result);
    }).catch(err=>console.log(err));


}

