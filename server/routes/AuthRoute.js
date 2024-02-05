const router=  require("express").Router();
const Teacher= require('../models/Teacher')
 
let CryptoJS = require("crypto-js");


router.get('/', (req, res)=>{
    res.json("auth working successfully");
})

// register 
router.post('/register', async(req, res)=>{
    try{
        const {teachername, email, password} = req.body;
        
        const newTeacher= new Teacher({
            teachername, email, password
        });
        await newTeacher.save();
        return res.status(200).json("Teacher created successfully");
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})


router.post('/login', async(req, res)=>{
    try{
        const {email, password}= req.body;

        const teacher= await Teacher.findOne({email: email, password: password});
        console.log(teacher);
        if(teacher === null) return res.status(404).json("No such user exists");
        
        return res.status(200).json(teacher);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})

router.post('/qrid', async(req, res)=>{
    try{
        const {email, password} = req.body;
        const myteacher= await Teacher.findOne({
            email, password
        });
        
        console.log(myteacher);
        let str= String(myteacher._id);
        
        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(str, process.env.SECRET_KEY).toString();
        var dataString = ciphertext.replace(/\//g,'s1L2a3S4h');
        console.log({str, ciphertext});
        // Decrypt

        return res.status(200).json({ciphertext: dataString});
        
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }

} )

router.get('/qrlogin/:ciphertext', async(req, res)=>{
    try{
        let {ciphertext}= req.params;
        ciphertext= ciphertext.replace(/s1L2a3S4h/g, '/');
        console.log('here in login route')
        console.log(ciphertext)
        var bytes  = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText);
        const myteacher= await Teacher.findById(originalText);
        return res.status(200).json(myteacher);

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Internal Server Error");
    }
})




module.exports= router;