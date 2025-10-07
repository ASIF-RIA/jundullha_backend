const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(value)=>{
                const result= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return result.test(value);
            },
            message:'Please enter a valid email',

        }
    },
    state:{
        type:String,
        default:"",
    },
    city:{
        type:String,
        default:"",
    },
    locality:{
        type:String,
        default:"",
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(value)=>{
                //check the password atleast 8 charachter
                return value.length >=8;
            },
            message :'Password must be 8 charachter long',
        }
    }

});

const User=mongoose.model("User",userSchema);

module.exports=User;