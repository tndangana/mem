const mongoose = require ('mongoose');


const TestSchema = mongoose.Schema({
  
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true },

       firstName:{
           type:String  
       },
       lastName:String,
       age:Number,
       date:{ type: Date, default: Date.now }
       
},{ 
    timestamps:true
   }

)
module.exports =  mongoose.model('test', TestSchema);