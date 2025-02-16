import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import api from "@/api";

interface Quiz {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get("/quizzes");
        console.log(res.data);
        if (res.data) {
          setQuizzes(res.data);
        }
      } catch (error) {
        toast.error("Error fetching quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-quiz/${id}`);
  };

  const handleDelete = (id: number) => {
    // Here you would typically call your API to delete the quiz
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      <h1 className="text-xl font-bold mb-4">Your Quizzes</h1>
      <Button onClick={() => navigate("/create-quiz")} className="mb-4">
        Create New Quiz
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleEdit(quiz.id)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(quiz.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
