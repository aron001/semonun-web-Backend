const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Custemerprofile = require('../models/custemerprofileModel')
const Enduserprofile = require('../models/enduserprofileModel')




const subscribe = asyncHandler(async (req, res) => {
    //router.put("/:id/follow", async (req,res)=>{
        if (req.user.id !== req.params.id){
            try{
                
                const user= await Custemerprofile.findById(req.params.id);
                //const cuser= await Custemerprofile.findOne(user)
                const currentUser = await Enduserprofile.findById(req.body.userId);
                //const eUser= await Enduserprofile.findOne(currentUser)
                if(!user.subscribers.includes(req.body.userId)){
                  await user.updateOne({ $push: { subscribers : req.body.userId}});  
                  await currentUser.updateOne({ $push: {subscribed: req.params.id }});
                    res.status(200).json("user has beeen followed");
                } else{
                    res.status(403).json("you allready follow this user")
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("you can't follow your self");
        }
    });
    // un subscribe

    const unsubscribe = asyncHandler(async (req, res) => {
        //router.put("/:id/follow", async (req,res)=>{
            if (req.user.id !== req.params.id){
                try{
                    
                    const user= await Custemerprofile.findById(req.params.id);
                    //const cuser= await Custemerprofile.findOne(user)
                    const currentUser = await Enduserprofile.findById(req.body.userId);
                    //const eUser= await Enduserprofile.findOne(currentUser)
                    if(user.subscribers.includes(req.body.userId)){
                      await user.updateOne({ $pull: { subscribers : req.body.userId}});  
                      await currentUser.updateOne({ $pull: {subscribed: req.params.id }});
                        res.status(200).json("user has beeen unsubscribed");
                    } else{
                        res.status(403).json("you allready unfollow this user")
                    }
                } catch (err) {
                    res.status(500).json(err);
                }
            } else {
                res.status(403).json("you can't follow your self");
            }
        });
    
    module.exports= {
        subscribe,
        unsubscribe
    }