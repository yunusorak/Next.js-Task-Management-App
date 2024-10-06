"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CardModal from "./cardModal";
import { addTasks } from "../actions/tasks";
import { useRouter } from "next/navigation";

export default function TaskList({ boardId, tasksP, listId, taskName }) {
  const [tasks, setTasks] = useState(Array.isArray(tasksP) ? tasksP : []);
  const [newTask, setNewTasks] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toLocaleDateString("tr-TR")
  );
  const router = useRouter();

  const addTask = (taskTitle) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: new Date().getTime(), title: taskTitle },
    ]);
  };

  const handleAddTask = async () => {
    await addTasks({
      boardId: boardId,
      listId: listId,
      taskTitle: newTask,
    });

    addTask(newTask);
    setNewTasks("");
    router.refresh();
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{taskName} Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex group items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex justify-between w-100">
                  <span className="font-medium">{task.title}</span>
                  <span>
                    {task.due_date && task.due_date !== "" && task.due_date}
                    {/* // for due_date */}
                  </span>
                </div>
                <CardModal boardId={boardId} listId={listId} task={task} />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Dialog className="relative">
            <DialogTrigger asChild>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Yeni Kart Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Yeni Kart Ekle</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    value={newTask}
                    onChange={(e) => {
                      setNewTasks(e.target.value);
                    }}
                    id="pano-title"
                    placeholder="Yeni Kart Başlığı"
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="bg-black hover:bg-slate-800 text-white"
                    onClick={() => handleAddTask()}
                    variant="secondary"
                  >
                    Ekle
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
