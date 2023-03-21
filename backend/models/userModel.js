const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
   
    email: {
        type:String,
        required:[true, 'please add an email'],
        unique:true
    },
    password: {
        type:String,
        min:6,
        max:255,
        required:[true, 'please add a password']
    },
    role: {
        type:Number,
        default:0,
       
    },
    verified: {
        type: Boolean,
        default: false,
      },
    
   
},
{
    timestamps:true
})
module.exports=mongoose.model('User',userSchema)