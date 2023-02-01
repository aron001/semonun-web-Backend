const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:[true, 'please add a name']
    },
    email: {
        type:String,
        required:[true, 'please add an email'],
        unique:true
    },
    password: {
        type:String,
        required:[true, 'please add a password']
    },
    hobby: {
        type:String,
        required:[false, 'please add a hobby']
    },
    address: {
        type:String,
        required:[true, 'please add a phone no']
    },
    phoneno:{
        type:String,
        required:[true, 'please add a phone no']
    },
},
{
    timestamps:true
})
module.exports=mongoose.model('User',userSchema)