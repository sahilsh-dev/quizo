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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
