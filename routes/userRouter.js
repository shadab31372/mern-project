import express from "express";
 import { getuser, login, logout, register, updateprofile } from "../controllers/userController.js";
import { IsAuthenctication } from "../middlewares/auth.js";


   const router = express.Router();
    
     router.post("/register",register);
     router.post("/login",login);
     router.get("/logout", IsAuthenctication,logout)
     router.get("/me", IsAuthenctication,getuser)
     router.put("/update/profile", IsAuthenctication,updateprofile)
      export default router

