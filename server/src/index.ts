import express, { Application } from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes";
import "./config/db.config";
import cors from "cors";
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/blog", blogRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
