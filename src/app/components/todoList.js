"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Save } from "lucide-react";

export default function TodoList({ todos, setTodos }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const percentage = (completedTodos / todos.length) * 100;
    setCompletionPercentage(percentage);
  }, [todos]);

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  return (
    <div className="w-full mx-auto mb-7">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium ms-auto">
            {Math.round(completionPercentage)}%
          </span>
        </div>
        <Progress value={completionPercentage} className="w-full" />
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="group flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            {editingId === todo.id ? (
              <>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow"
                />
                <Button size="sm" onClick={() => saveTodo(todo.id)}>
                  <Save className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <span
                  className={`flex-grow cursor-pointer ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => startEditing(todo.id, todo.text)}
                >
                  {todo.text}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => startEditing(todo.id, todo.text)}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
