const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
   
    email: {
        type:String,
        required:[true, 'please add an email'],
        unique:true
    },
    password: {
        type:String,
        required:[true, 'please add a password']
    },
    role: {
        type:Number,
        default:0,
       
    },
   
},
{
    timestamps:true
})
module.exports=mongoose.model('User',userSchema)