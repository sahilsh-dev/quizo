import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Dummy middleware to check if user is authenticated
router.use((req: Request, res: Response, next) => {
  // In production, verify a JWT or session; here we check for our dummy token.
  const authHeader = req.headers.authorization || "";
  if (authHeader === "Bearer dummy-token") {
    // For simplicity, assume the teacher's ID is 1.
    (req as any).teacherId = 1;
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// POST /quizzes: Create a new quiz with a title and description.
router.post("/quizzes", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const teacherId = (req as any).teacherId;
  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        teacherId,
      },
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
});

// GET /quizzes: Retrieve a list of all quizzes created by the logged-in teacher.
router.get("/quizzes", async (req: Request, res: Response) => {
  const teacherId = (req as any).teacherId;
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { teacherId },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quizzes", error });
  }
});

// GET /quizzes/:id: Retrieve the details of a specific quiz.
router.get("/quizzes/:id", async (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id, 10);
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving quiz", error });
  }
});

// PUT /quizzes/:id: Edit an existing quiz’s title or description.
router.put("/quizzes/:id", async (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { title, description },
    });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
});

// DELETE /quizzes/:id: Delete a quiz from the database.
router.delete("/quizzes/:id", async (req: Request, res: Response) => {
  const quizId = parseInt(req.params.id, 10);
  try {
    await prisma.quiz.delete({
      where: { id: quizId },
    });
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
});

export default router;
