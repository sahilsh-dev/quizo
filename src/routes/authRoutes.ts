import { Request, Response, Router } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "teacher" && password === "password") {
    return res.json({ message: "Login successful", token: "dummy-token" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
