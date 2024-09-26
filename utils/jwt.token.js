export const sendtoken = (user, statuscode, res, message) =>{
   
        const token = user.getJWTtoken();
        const options  = {
                       expires : new Date(
                        Date.now()+process.env.COOKIE_EXPIRE*24*60*100
                       ),
                         httpOnly:true,

        }
res.status(statuscode).cookie("token",token,options).json({
     sucess: true,
     user,
     message,
     token,



});

};