import express,{Application} from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRoutes from "./routes/blog.routes";
import dbConfig from './config/db.config';

dotenv.config();

const app:Application = express();

const PORT = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Routes

app.use('/api/blog',blogRoutes);

mongoose.connect(dbConfig.MongoDB_Url).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
}).catch((error)=>{
    console.log("MongoDB connection error:", error);
    process.exit(1) 
})