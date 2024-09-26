import mongoose from "mongoose";

export const connection = () => {
           mongoose.connect(process.env.MONGO_URL, {
             dbName: "job_portal_automation"

           }) .then(() => {
         console.log("connected to database")

           })
            .catch(error => {

             console.log(`didnt connected  ${error}`)
           })  

}