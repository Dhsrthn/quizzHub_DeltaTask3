const mongoose=require('mongoose')

const QuizSchema=new mongoose.Schema({
    quiz:{
        type:mongoose.SchemaTypes.Array,
        required: true,
    },
    quizdesc:{
        type:mongoose.SchemaTypes.Array,
        required: true,
    },
    quizname:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    quizid:{
        type:mongoose.SchemaTypes.String,
        requied:true,
    },
    userid:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    numberoftimestaken:{
        type:mongoose.SchemaTypes.Number,
        requied:true,
        default:0,
    },
    takenby:{
        type:mongoose.SchemaTypes.Array,
        default:[],
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
    user:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
})

module.exports=mongoose.model('Quizzes',QuizSchema)