const mongoose= require('mongoose');

let Schema= mongoose.Schema;
const ResponseSchema= new mongoose.Schema({
    name:{
        type:String, 
        required: true
    },
    rollno:{
        type: String,
        required:true
    },
    latitude:{
        type:String,
        required: true
    },
    longitude:{
        type:String,
        required: true
    }
},
{timestamps: true});

module.exports= mongoose.model("Response", ResponseSchema);
