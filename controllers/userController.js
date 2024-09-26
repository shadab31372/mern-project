import { catchAsyncErrors} from "../middlewares/catchasynError.js";
import ErrorHandler from "../middlewares/error.js"
import {User} from "../models/userSchema.js"
import {v2 as cloudinary} from  "cloudinary"
import {sendtoken} from "../utils/jwt.token.js"
  
  export const register = catchAsyncErrors (async(req,res,next) => {
                 const { name , email ,   address  ,  password,

                 } =req.body

            
                  if 
                  ([name,email,address,password].some((field)=> field?.trim() === "")
                )
                  {
                    throw new ErrorHandler(400,"all fields are required ")
                  }
             
                    const existeduser =  await User.findOne({$or:[{name},{email}]})
                     
                     if (existeduser){
                      throw new ErrorHandler(201,"user  exist ")
                     }

                   const user =  await   User.create({
                      name,
                      email
                    ,
    
                    password,
                    address

                      })
                      const  createduser =    User.findById(user._id).select(
                        "-password -"
                      )
                        if(!createduser){
                          throw new ErrorHandler(500,"something went wrong ")
                        }
                                sendtoken(user,201,res,"user registered");
                                
                        return res.status(201).json(
                          new ErrorHandler(200, "created user succesfully")
                        )
           

  })
        export const login = catchAsyncErrors(async(req,res,next)=>{
            const {email,password} =req.body;
            if(!email || !password ){

              return next (new ErrorHandler("email passowrd is required ",404))
            }

              const user = await User.findOne({email}).select("+password");
            if(!user){
              return next (new ErrorHandler("Invalid email or password "));
            }
              const ispasswordismatched =  await user.comparepassword(password)

              if(!ispasswordismatched){
                
      
                 return next ( new ErrorHandler("ina=vlaid password or email", 401))
              
              }
                sendtoken(user ,200,res, "user logged in succesfully")
              

        });
               export const logout = catchAsyncErrors(async(req,res,next)=>{
                    res.status(200).cookie("token", "", {

                      expires : new Date(
                        Date.now() ),
                         httpOnly:true,
                    }).json({
                    sucesss  : true ,
                   message : "logout succesfully"
                    })
   


                  })
                  export const getuser = catchAsyncErrors (async(req,res,next)=> {

                      const user = req.User;
                      res.status(200).json({
                               sucesss: true ,
                               user,
                      })
                  })

                   export const updateprofile = catchAsyncErrors(async(req,res,next)=>{
                          const newUserdata = {
                              name  : req.body.name,
                            email  : req.body.email,
                             phone   : req.body.phone,
                              address : req.body.address
                          }
                            const user = await findByIdAndupdate(req.user.id, newUserdata,{
                                     new : true,
                                      runvalidators: true,
                                       useFindAndModify: false
            });
                      res.status(201).json ({
                            success : true,
                            message : "profile is updated"

                      });
                   });
            
                     export const updatepassword = catchAsyncErrors(async(res,req,next)=>{
                          const user = await User.findById(req.user.id).select("+password");
                           
                           const ispasswordMatched = await user.comparepassword(req.body.oldpassword);

                            if(!ispasswordMatched){
                               return  next(new ErrorHandler ("old password is  not matched ",400))

                            

                            }
                                       if (req.body.newpassword !== req.body.confirmpassword){

                          return  next (new ErrorHandler(" enter again & password didnt matched "))

                                       }

                     })
                    