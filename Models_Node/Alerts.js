const mongoose=require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema=mongoose.Schema;

const AlertSchema=mongoose.Schema({

    Criminal:{
        type:String
    },

    Date:{
        type:Date
    }

})

const Alert=mongoose.model('Alert',AlertSchema);

exports.createOne=(data)=>{
    const newAlert=new Alert(data);
    return newAlert.save();
}


exports.list=(perPage,Page)=>{
    return new Promise((resolve,reject)=>{
        Alert.find()
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
