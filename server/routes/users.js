const express = require('express')
const router = express.Router()
const Profile = require('../database/schemas/profiledata')

router.get('/',async(req,res)=>{
    let currUser
    await Profile.findOne({ id:'"'+req.session.user+'"' }).then((data)=>{
        currUser=data.username
        }).catch((err)=>console.log(err))
    await Profile.find({username:{$ne: currUser}}).then((data)=>{
        res.send([data,currUser])
    })
})

router.get("/currentuser", async (req, res) => {
    await Profile.findOne({ id:'"'+req.session.user+'"' }).then((data) => {
        res.send(data)

        }).catch((err) => console.log(err))
})
router.get("/search/:user",async(req,res)=>{
    user=req.params.user
    await Profile.find({username: {$regex: user, $options: 'i'}}).then((data)=>{
        if(data.length==0){
            res.send('no user')
        }else{
            res.send(data)
        }
    })
})

router.get("/:username", async (req, res) => {
    username = req.params.username
    await Profile.findOne({ username }).then((data) => {
        if(data==null){
            res.send('no user')
        }else{
            const myarray = []
            myarray.push(data)
            myarray.push(req.session.user)
            res.send(myarray)
        }
    })
})


module.exports = router