import express, {json} from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {getUser, login, register} from "./controllers/UserController.js";
import {authValidator} from "./services/validators.js";
import handleValidationError from "./middlewares/handleValidationError.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', authValidator, handleValidationError, register);
app.post('/login', authValidator, handleValidationError, login);
app.get('/me', isAuthenticated, getUser);


const PORT = process.env.PORT || 8888;

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



