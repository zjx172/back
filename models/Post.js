const mongoose=require('mongoose');
const person=require('../models/Person');
const PostSchema=mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    photo:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    like:{
        type:Number,
        default:0
    },
    likenumber:{
        type:Number,
        default:0
    },
    users_like_this_post: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'person',
    }],
})

module.exports=mongoose.model('Posts',PostSchema);