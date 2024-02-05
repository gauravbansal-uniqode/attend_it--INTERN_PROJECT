const Class = require("../models/Class");
const Classroom = require("../models/Classroom");
const Response= require("../models/Response");

const router=  require("express").Router();

// create a new classroom
router.post('/', async(req, res)=>{
    try{
            const {classroomName, teacherId}= req.body;
            const newClassroom=  new Classroom({classroomName:classroomName, creator: teacherId});
            await newClassroom.save();

            return res.status(200).json(newClassroom)
            
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

})

// get all classrooms by teacherid
router.get('/:teacherId', async (req, res)=>{
    try{
        const {teacherId}= req.params;
        const classrooms= await Classroom.find({creator:teacherId});

        return res.status(200).json(classrooms);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})


router.post('/add-class/:classroomId', async (req, res)=>{
    try{
           const {className, latitude, longitude}= req.body;
           const {classroomId}= req.params;
           
           const newClass= new Class({
             name: className,
             latitude: latitude,
             longitude: longitude
           });
           
           await newClass.save();

           const classroom= await Classroom.findById(classroomId);
           const myclasses= classroom.classes;
           const myClassroom= await Classroom.findByIdAndUpdate(classroomId, {
                classes: [...myclasses, newClass._id]
           })

           return res.status(200).json(newClass);

    }
    catch(err){
         console.log(err);
         return res.status(500).json("Internal Server Error");
    }
})

router.get('/classes/:classroomId', async(req, res)=>{
    try{
        const {classroomId}= req.params;
        const classroom= await Classroom.findById(classroomId).populate('classes');
        return res.status(200).json({name: classroom.classroomName, classes: classroom.classes});

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})

router.get('/toggleAccept/:classId', async(req, res)=>{
    try{
        const {classId}= req.params;
        const myclass= await Class.findById(classId);
        const submission= !myclass.acceptingResponse;
        await Class.findByIdAndUpdate(classId,{
            acceptingResponse: submission
        } );
        return res.status(200).json("Toggled response submission");
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})

router.get('/isAccepting/:classId', async(req, res)=>{
    try{
        const {classId}= req.params;
        const myclass= await Class.findById(classId);
        return res.status(200).json(myclass.acceptingResponse);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");

    }
})

router.post('/add-response/:classId', async(req, res)=>{
    try{
        const {name, rollno, latitude, longitude}= req.body;
        const {classId}= req.params;
        const newResponse= new Response({
            name: name,
            rollno: rollno,
            latitude: latitude,
            longitude: longitude
        });
        await newResponse.save();
        const myclass= await Class.findById(classId);
        if(!myclass.acceptingResponse) return res.status(404).json("Form not accepting responses");
        const responses= myclass.responses;
        await Class.findByIdAndUpdate(classId, {
            responses: [...responses, newResponse._id]
        });
        return res.status(200).json("response added");
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/get-responses/:classId', async (req, res)=>{
    try{
        const {classId}= req.params;
        const myclass = await Class.findById(classId).populate('responses');
        return res.status(200).json(myclass.responses);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})


module.exports= router;