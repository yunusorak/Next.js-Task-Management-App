"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { PlusCircle, X, CheckCheck } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function TaskDialog({
  todos,
  setTodos,
  setListTitle,
  listTitle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [todoText, setTodoText] = useState("");

  const handleAddList = () => {
    console.log("Yeni liste ekleniyor:", listTitle, "Yapılacaklar:", todos);
    setListTitle("");
    console.log(todos);
    console.log(listTitle);
    setIsOpen(false);
  };

  const handleAddTodo = () => {
    if (todoText.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: todoText.trim(), completed: false },
      ]);
      setTodoText("");
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-start flex justify-start"
        >
          <CheckCheck className="mr-2 w-4 h-4" /> Kontrol Listesi
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Kontrol Listesi Ekle</DialogTitle>
          <DialogDescription aria-describedby={undefined}></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="list-title" className="text-right">
              Liste Adı
            </Label>
            <Input
              id="list-title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="col-span-3"
              placeholder="Yeni liste adı"
            />
          </div>
          <div className="space-y-2">
            <Label>Yapılacaklar</Label>
            <div className="flex space-x-2">
              <Input
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Yeni yapılacak iş..."
                onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              />
              <Button onClick={handleAddTodo} size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[200px] w-full rounded-md border p-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex p-2 underline items-center justify-between"
                >
                  <span>{todo.text}</span>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    size="icon"
                    onClick={() => handleRemoveTodo(todo.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <Button onClick={handleAddList} className="w-full">
          Tamamla
        </Button>
      </DialogContent>
    </Dialog>
  );
}
