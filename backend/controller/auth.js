import User from '../models/User.js';

export const register = async (req,res) => {
    const newUser = new User(req.body);
     try{
     const savedUser = await newUser.save();
     res.status(200).json(savedUser);
    }
    catch(err){
     res.status(500).json(err);
    }
 }

 export const signin = async (req, res) => {
    try{
     const user = await User.findOne({
         email: req.body.email
     })
     if(!user){
         res.status(411).json('error signing in');
     }
     else{
         if(user.password===req.body.password){
             res.json('success');
         }
         else{
             res.status(411).json('error signing in');
         }
     }
    }catch(err){
     res.status(500).json(err);
    } 
 }