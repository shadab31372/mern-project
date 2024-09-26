import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
    

   const userSchema  = new mongoose.Schema({
           name :{
              type : String ,
              required :  true,
              minilength : [3, "name must contain atleast  3 character"],
              maxlenght : [30, "name must contain atleast  30 character"]

           },
           email :{
             type : String,
            required :  true,
            validator: [validator.isEmail, "please provide valid email"]
 },
           Phone :{ type : String ,
             
     },
           surname :{
              type :String,            
           },
           address :{
            type : String ,
            required :  true,
           },
           niches : {firstniche : String,
            Secondniche : String,
            thirdniche : String,
           },
           password :{
            type : String ,
            required :  true,
            minilength : [8, "password must contain 8 letters "],
            maxlenght : [30, "max 30 letters "],
            select : false
            
           },
           resume :{
            public_id :String,
             url : String,
           }, 
           coverletter :{
            type : String,
           },
            role:{
                type : String,
               
            },
            createdat: {
                type : Date,
                default : Date.now,
            },
        }); 

              userSchema.pre("save", async function (next) {
                 if(!this.isModified("password"))
                 
                    {
                    next () }

                    this.password = await bcrypt.hash(this.password, 10)
              })
                              userSchema.methods.comparepassword = async function (enteredpassword) {
                                return await bcrypt.compare(enteredpassword, this.password)
                                
                              }


                         userSchema.methods.getJWTtoken =function(){
                            return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
                         expiresIn : process.env.JWT_EXPIRE,
                         });
                         };

           export const User = mongoose.model("User" , userSchema)