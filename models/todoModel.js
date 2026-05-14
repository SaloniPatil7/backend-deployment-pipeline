const mongoose = require('mongoose');
const { ref } = require('process');


const todoSchema=mongoose.Schema({
   task:{
    type:String,
    required:true,
   },
   date:{
    type:Date,
    default: Date.now
   },
   createdBY:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
   }
})

const Todo = mongoose.model('Todo',todoSchema);
module.exports=Todo;