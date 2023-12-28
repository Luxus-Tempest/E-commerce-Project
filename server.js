import express from "express"; //Biblio pour les outils de creation de server

import mongoose from 'mongoose';
import dotenv from "dotenv";


//IMPORTER LES ROUTERS
import userRouter from "./Routes/user.Route.js"; //Creer un router userRouter
import reviewRoute from "./Routes/review.route.js"; 
import orderRouter from "./Routes/order.route.js"; 
import messageRouter from "./Routes/message.route.js"; 
import gigRouter from "./Routes/gig.route.js"; 
import conversationRouter from "./Routes/conversation.route.js"; 
import authRouter from "./Routes/auth.route.js"; 

import cookieParser from "cookie-parser";
import cors from "cors";




//Creer une application Express en appelant la fonction express()
//Cette application sera notre serveur web.
const app = express(); 


//Pour pouvoir utliser dotenv pour le fichier .env
//SE CONNECTER A MONGODB
dotenv.config(); 

mongoose.set('strictQuery', true); //pour je ne sais quoi

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

//AUTORISER LE CLIENT A ENVOYER DE REQUETE JSON (POSTMAN)
const customCors = (req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

app.use(express.json());
app.use(cookieParser());
app.use(customCors);//Accepter les requetes dont l'origine est http://localhost:5173
//app.use(cors({origin:"http://localhost:3000", credentials:true}));//Accepter les requetes dont l'origine est http://localhost:3000


//APPELLER LES ROUTERS ET LES ASSOCIER A UN CHEMIN D'ACCES
app.use("/FIVERR/users", userRouter);
app.use("/FIVERR/gigs", gigRouter);
app.use("/FIVERR/orders", orderRouter);
app.use("/FIVERR/messages", messageRouter);
app.use("/FIVERR/conversations", conversationRouter);
app.use("/FIVERR/reviews", reviewRoute);
app.use("/FIVERR/auth", authRouter);

app.use((err,req,res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).send(errorMessage);
});


//Ecouter les requetes entrantes sur le port 8080 : Le server sera accessible sur http://localhost:8080.
app.listen(8080, () =>{
    connect();
    console.log("Backend server listening");
});