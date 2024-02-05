const mongoose= require('mongoose');
const Teacher = require('./Teacher');
const Class = require('./Class');

let Schema= mongoose.Schema;
const ClassroomSchema= new mongoose.Schema({
    classroomName:{
        type:String, 
        required: true
    },
    classes:{
        ref: Class,
        type: [Schema.Types.ObjectId]
    },
    creator:{
        ref: Teacher,
        type: Schema.Types.ObjectId
    }
});

module.exports= mongoose.model("Classroom", ClassroomSchema);
