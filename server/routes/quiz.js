const express = require('express')
const router = express.Router()
const Quizzes = require('../database/schemas/quizzes')
const Profile = require('../database/schemas/profiledata')

router.post("/", async (req, res) => {
    let number
    let list=[]
    let currUser
    const checkID = '"' + req.session.user + '"'
    await Profile.findOne({ id: '"' + req.session.user + '"' }).then((data)=>{
        number=data.noquizzes
        list=data.quizlist
        currUser=data.username
    }).then(()=>{
        number++
        list.push(req.body.toSend[3])
    }).catch((err)=>console.log(err))
    await Profile.updateOne({ id: '"' + req.session.user + '"' },{$set:{noquizzes:number,quizlist:list}
    }).catch((err)=>console.log(err))

    await Quizzes.create({ quiz: req.body.toSend[2], quizdesc: req.body.toSend[1][0], quizname: req.body.toSend[0][0], quizid: req.body.toSend[3], userid: checkID,user:currUser, }).then(console.log('success')).catch((err) => console.log(err))

    
    res.send('hi')
})

router.get("/", async(req,res)=>{
    const priority=req.query.priority
    if (priority === 'recent' && await Quizzes.countDocuments()>0) {
        try {
          const allQuizzes = await Quizzes.find().sort({ createdAt: -1 });
          for (const curr of allQuizzes) {
            const profile = await Profile.findOne({ id: curr.userid }).exec();
            curr.user = profile.username;
            await curr.save(); 
          }
          res.send(allQuizzes);
        } catch (err) {
        }
      }else if(priority === 'recent' && !(await Quizzes.countDocuments()>0)){
        res.send('no records found')
      }
        else if(priority==='popular' && await Quizzes.countDocuments()>0){
        await Quizzes.find().sort({numberoftimestaken:-1}).then((data)=>{
            res.send(data)
        })
    }else{
        res.send('no records found')
    }
    
})

router.get("/myquizzes", async(req,res)=>{
    let currUser
    await Profile.findOne({ id: '"' + req.session.user + '"' }).then((data)=>{
        currUser=data.username
    })
    await Quizzes.find({user:username}).then((data)=>{
        if(data==null){
            res.send('no quiz')
        }else{
            res.send(data)
        }
    })

})

router.get("/:quizid", async (req, res) => {
    const sendArray=[]
    let userID
    quizid = req.params.quizid
    await Quizzes.findOne({ quizid }).then((data) => { 
        userID=data.userid
        sendArray.push(req.session.user)
        sendArray.push(data)
    })
    await Profile.findOne({id:userID}).then((data)=>{
        sendArray.push(data.username)
    }).then(()=>{res.send(sendArray)})
})

router.patch("/:quizid", async (req, res) => {
    let historyarray = []
    let numbertake = 0
    let takeby = []
    let takenusername
    const { score,total } = req.body
    quizid = req.params.quizid
    const currentprofile = await Profile.findOne({ id: '"' + req.session.user + '"' }).then((data) => {
        historyarray=data.quizhistory
        takenusername=data.username
    }).then(()=>historyarray.push([quizid,score,total])).catch((err)=>console.log(err))

    await Profile.updateOne({ id: '"' + req.session.user + '"' }, { $set: { quizhistory: historyarray } }).then(console.log('profileupdate')).catch((err)=>console.log(err))


    const currentquiz = await Quizzes.findOne({ quizid }).then((data) => {
        numbertake = data.numberoftimestaken
        takeby = data.takenby
    }).then(() => {
        numbertake = numbertake + 1
        takeby.push([takenusername,score])
    }).catch((err)=>console.log(err))


        await Quizzes.updateOne({ quizid }, { $set: { numberoftimestaken: numbertake, takenby: takeby } }).then(console.log('quizupdate')).catch((err)=>console.log(err))


    res.send('hi')
})
module.exports = router