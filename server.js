import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import authroutes from "./routes/authroute.js"
import connectDB from './config/db.js';
import cors from 'cors'
import  Categoryroutes from './routes/CategoryRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import path from 'path';
//configure env
dotenv.config();
//database configure
connectDB();
//rest object
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"./client/build")));
//routes
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/category',Categoryroutes);
app.use('/api/v1/product',ProductRoutes);
//rest api
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
//port 
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});