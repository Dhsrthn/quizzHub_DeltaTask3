const express = require('express')
const app=express();
const cors = require("cors")
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(

    cors({
        origin:'http://localhost:3000',
        credentials: true
    })
)
app.use(cookieParser());
app.use(session({
    secret: 'peepeepoopoo', 
    resave: false, 
    saveUninitialized: false ,
    cookie: {   secure: false,
                path:'/', 
            },
  }));

require('./database/database')

app.listen(3500, ()=> console.log('running'))



const authRouter = require('./routes/auth')
app.use('/auth',authRouter)

app.use((req,res,next)=>{
    if(req.session){
        if(req.session.Isloggedin){
            next()
        }
        else{
            res.send('error')
        }
    }else{
        res.send('error')
    }
    
})

app.get('/',(req,res)=>{
    if(req.session.Isloggedin){
        res.send(true)
    }
})


const userRouter = require('./routes/users');
app.use('/users',userRouter)

const quizRouter = require('./routes/quiz')
app.use('/quiz',quizRouter)

