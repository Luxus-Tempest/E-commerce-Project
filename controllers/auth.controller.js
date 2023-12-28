//DEFINIR LES FOCNTIONS D'AUTHENTIFICATION
import User from "../models/user.model.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";



export const register = async (req, res)=>{
    try{

        //crypter le password
        const hash = bcrypt.hashSync(req.body.password, 5);

        //body pour implementer l'ajout via postman
        const newUser = new User({
            ...req.body,
            password: hash,
        }); 

        //ATTENDRE D'ENREGISTRER CES DONNEES DANS LA BD MONGO
        await newUser.save();
        res.status(201).send("User created successfully");

    }catch(error){
        res.status(500).send("Something went wrong");
    }
}



export const login = async (req, res)=>{
    try{

        //TESTER SI LE USER N'EXISTE PAS ET SI LE MDP INCORRECTE
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(404).send("User not found");

    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if(!isCorrect) return res.status(400).send("Wrong password or username");
    
    const token = jwt.sign({
        id: user._id,
        isSeller: user.isSeller,
    }, 
    process.env.JWT_KEY 
    );


    //SINON TOUT EST CORRECTE
    const {password, ...info} = user._doc
    res.cookie("accessToken", token, {
        httpOnly: true,
    }).status(200).send(info);

    }catch(error){
        res.status(500).send("Something went wrong");
    }
}

export const logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };