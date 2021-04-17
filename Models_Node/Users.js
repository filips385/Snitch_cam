const mongoose=require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema=mongoose.Schema;

const userSchema=new Schema({

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },   
    Permission:{
        type:Number,
        required:false
    }
})

const User=mongoose.model('User',userSchema);

exports.createOne=(data)=>{
    const newUser=new User(data);
    return newUser.save();
}

exports.findById = (id) => {
    return new Promise((resolve,reject)=>{
        User.find({_id:id}).exec((err,data)=>{
            if(data){
                delete data._id;
                delete data.__v;
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

exports.list=(perPage,Page)=>{
    return new Promise((resolve,reject)=>{
        User.find()
        .limit(perPage)
        .skip(perPage*Page)
        .exec(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

exports.findByIdAndDelete=(id)=>{
    return new Promise((resolve,reject)=>{
        User.findOneAndDelete({_id:id}).exec(err=>{
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        });
    })

}


exports.findByIdAndUpdate = (id, userData) => {
    return new Promise((resolve,reject)=>{
        User.findOneAndUpdate({_id:id},userData).exec((err,data)=>{
            if(data){
                resolve(data)
            }else{
                reject(err)
            }

        })
    })

};

module.exports.User;