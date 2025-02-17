import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/api";

export default function CreateEditQuiz() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state?.title || "");
  const [description, setDescription] = useState(
    location.state?.description || "",
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast("Title and description are required");
      return;
    }
    try {
      await api.put(`/quizzes/${id}`, { title, description });
      toast("Quiz updated successfully");
    } catch {
      toast.error("Error updating quiz");
    }
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast("Title and description are required");
      return;
    }
    try {
      await api.post("/quizzes", { title, description });
      toast("New Quiz created successfully");
    } catch {
      toast.error("Error creating quiz");
    }
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{id ? "Edit Quiz" : "Create New Quiz"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Quiz Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {id ? (
            <Button onClick={handleUpdate}>"Update Quiz"</Button>
          ) : (
            <Button onClick={handleSubmit}>"Create Quiz"</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
