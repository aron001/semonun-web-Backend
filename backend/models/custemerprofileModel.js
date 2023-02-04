const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    fullname: {
        type:String,
        required:[true, 'please add a fullname']
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
module.exports=mongoose.model('Custemerprofile',userSchema)