import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import quizRoutes from "./routes/quizRoutes";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(authRoutes);
app.use(quizRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
