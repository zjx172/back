const mongoose=require('mongoose');
// const post = mongoose.model('Posts');
const post=require('../models/Post');
const PersonSchema=mongoose.Schema({
    openid:{
        type:String,
        required:true
    },
    // post:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'post',
    //     required:true
    // }
})

// var childSchema = new Schema({ name: 'string' });

// var parentSchema = new Schema({
//   // Array of subdocuments
//   children: [childSchema],
//   // Single nested subdocuments. Caveat: single nested subdocs only work
//   // in mongoose >= 4.2.0
//   child: childSchema
// });

module.exports=mongoose.model('Person',PersonSchema);