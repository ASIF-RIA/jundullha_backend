//import the express module
const express = require('express');
const mongoose = require('mongoose');
const authRouter=require('./routes/auth');

//Define the port number the server will listen on
const PORT = 3000;
//create an instance of an express application
//beceause it give us the starting port
const app = express();

// app.get("/hello",(req,res)=>{
//     res.send('Hello world');
// });
//mongodb string

const DB="mongodb+srv://jundullha:asif2003@cluster0.ysxz9bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//middleware - to register routes or to mount routes
app.use(express.json());
app.use(authRouter);
app.use('/api', authRouter);



mongoose.connect(DB).then(()=>{
    console.log('Mongodb connected');
});


//start the server and on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //LOG THE NUMBER
    console.log(`server is running on port ${PORT}`);

});
