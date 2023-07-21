const express= require('express')
const router=express.Router()
const User = require('../database/schemas/user')
const Profile = require('../database/schemas/profiledata')
const {hashMyPassword,comparePassword} = require('../utils/hasher')



router.post('/login', async (req,res)=>{
    const {username, password} = req.body
    if( !username || !password) return res.send(400)
    const userDB = await User.findOne({ username})
    if(!userDB) return res.send('no user')
    const isValid = comparePassword(password, userDB.password)
    if(isValid){
        req.session.Isloggedin=true
        req.session.user=userDB._id
        return res.send(201)
    }else{
        return res.send('wrong password')
    }

})

router.get('/logout',async(req,res)=>{
   req.session.destroy()
   res.send('logged out')
})


router.post('/register', async (req,res)=>{
    const { username} = req.body
    const userDB= await User.findOne({username})
    if(userDB){
        res.send('user exists')
    }else{
        const password=hashMyPassword(req.body.password)
        await User.create({username,password}).then(console.log('new user created')).then( async ()=>{
            const created= await User.findOne({username})
            const uniqueID=JSON.stringify(created._id)
            const noquiz=0
            const quizlist=[]
            await Profile.create({username,id:uniqueID,noquiz,quizlist})
        }).then(res.send('user profile created'))
        
    }
})

module.exports=router
