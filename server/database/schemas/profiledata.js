const mongoose=require('mongoose')

const ProfileSchema= new mongoose.Schema({
    username:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    id:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    noquizzes:{
        type:mongoose.SchemaTypes.Number,
        default: 0
    },
    quizlist:{
        type:mongoose.SchemaTypes.Array,
    },
    quizhistory:{
        type:mongoose.SchemaTypes.Array,
        default:[],
    }
})

module.exports=mongoose.model('Profile',ProfileSchema)