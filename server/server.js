const express= require('express');
const app= express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const morgan= require('morgan');
const AuthRoute= require("./routes/AuthRoute");
const ClassroomRoute= require("./routes/ClassroomRoute");
var cors = require('cors');
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(morgan("common"));

app.use('/api/auth', AuthRoute);
app.use('/api/classroom', ClassroomRoute);


app.get("/api", (req, res)=>{
    res.json("successfully running");
})


app.listen(5500, ()=>{console.log("server started on 5500");})