import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res, next)=>{

    const user = await User.findById(req.params.id);

        if(req.userId !== user._id.toString()){
            return res.status(403).send("You can not delete because it is not yours");
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account deleted successfully !");
}

export const getUser = async (req, res, next)=>{
    const user = await User.findById(req.params.id);
        res.status(200).send(user); 
}

export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      console.error("Error fetching users:");
      res.status(500).send({ error: "Internal Server Error" });
    }
  };


/*
export const deleteUser = async (req, res)=>{

    const user = await User.findById(req.params.id);
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).send("You're are not authenticated");

    jwt.verify(token, process.env.JWT_KEY, async (err,payload)=>{
        if(payload.id !== user._id.toString()){
            return res.status(403).send("You can not delete because it is not yours");
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Account deleted successfully !");
  
    });
    

}
*/