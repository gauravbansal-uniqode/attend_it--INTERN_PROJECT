const mongoose= require('mongoose');
// const Classroom = require('./Classroom');
// const Class = require('./Class');

let Schema= mongoose.Schema;

const TeacherSchema= new Schema({
    teachername:{
        type:String,
        require: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
});


module.exports= mongoose.model("Teacher", TeacherSchema);
