class Errorhandler extends Error {
    constructor(message, statuscode){
                super(message)
                this.statuscode = statuscode;

    }
}   
 export const errormiddleware =( err,req,res,next) =>{

                err.statuscode =err.statuscode || 500;
                err.message =err.message ||"internal server error";

                if (err.name == "castError"){
                     const message = `Invalid ${err.path}`;
                     err = new Errorhandler(message,700)


                }
                  if (err.code === 11000){
                    const message = `duplicate ${Object.keys(err.keyvalue)} Entered.`
                    err = new Errorhandler(message,600)
                    
                  }
                  if(err.name === "jebwebtokenerror" ){
                    const message = `json web token is invalid Try again `;
                    err= new Errorhandler(message,500) }
                      
                    if(err.name === "tokenexpirederror" ){
                      const message = `json web token is expired Try again `;
                      err= new Errorhandler(message,900) }
                        

      
                return res.status(err.statuscode).json({
                 success : false,
                   message : err.message,
                  
                })
              }  


  export default Errorhandler