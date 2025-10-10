const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt= require('jsonwebtoken');


authRouter.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // ✅ Check if all fields are present
        if (!fullname || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all fields.' });
        }

        // ✅ Check if password is at least 8 characters (BEFORE hashing)
        if (password.length < 8) {
            return res.status(400).json({ msg: 'Password must be at least 8 characters long.' });
        }

        // ✅ Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: 'Email already exists.' });
        }

        // ✅ Hash the password AFTER validation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create new user
        let user = new User({
            fullname,
            email,
            password: hashedPassword
        });

        // ✅ Save to DB
        user = await user.save();

        // ✅ Send success response
        res.status(200).json({ user });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//signin api endpoint
authRouter.post('/signin',async(req,res)=>{
    try{
        const {email,password} =req.body;
        const findUser =await User.findOne({email});
        if(!findUser){
            return res.status(400).json({msg:"User not found with this email"});

        }
        else{
          const isMatch =await bcrypt.compare(password,findUser.password);
          if(!isMatch){
            return res.status(400).json({msg:'Incorrect password'});
          }
          else{
            const token = jwt.sign({id:findUser._id},"passwordkey");
            
            //remove sensitive information
            const {password , ...userwithoutpassword}=findUser._doc;


            //send the respones
            res.json({token, ...userwithoutpassword});

          }
        }
    } 
    catch(error){
        res.status(500).json({error:e.massage});

    }
    
});


module.exports = authRouter;
