const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/quizzhub').then(() => console.log("connected to DB")).catch((err) =>console.log(err))
