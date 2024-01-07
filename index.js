import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);

(async function start() {
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("You forgot to set MONGO_DB_URI");
    }
    await mongoose.connect(process.env.MONGO_DB_URI)
      .then(() => console.log(`Connected to MongoDB: ${new Date().toLocaleString()}`));

    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (e) {
    console.log(e)
  }
})();



