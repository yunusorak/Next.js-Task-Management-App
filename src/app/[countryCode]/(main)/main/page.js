"use client";
import { addBoard, getBoardsWithEmail } from "@/app/actions/tasks";
import { defaultLocale } from "@/app/consts/lang";
import useUserStore from "@/app/store/userStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/card"; // Shadcn Card bileşeni
import { Button } from "@/app/components/ui/button"; // Shadcn Button bileşeni
import { Plus, PlusCircle } from "lucide-react"; // Plus ikonu
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

export default function Main() {
  const user = useUserStore((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      if (user && user.email) {
        const response = await getBoardsWithEmail(user.email);
        setBoards(response);
        console.log(response);
      }
    };

    fetchBoards();
  }, [user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {boards.map((board) => (
        <Link
          key={board.boardId}
          href={`/${defaultLocale}/main/board/${board.boardId}`}
        >
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-4">
              <h3 className="font-semibold text-lg">{board.name}</h3>
              <p className="text-sm text-gray-600">
                {board.description || "Açıklama yok"}
              </p>
            </div>
          </Card>
        </Link>
      ))}

      <Dialog className="relative">
        <DialogTrigger asChild>
          <div>
            <Button
              className="flex items-center"
              onClick={() => {
                addBoard({
                  boardName: newBoardTitle,
                  email: user.email,
                });
                setNewBoardTitle("");
              }}
            >
              <Plus className="mr-2" /> Yeni Pano Ekle
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Yeni Pano Ekle</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                value={newBoardTitle}
                onChange={(e) => {
                  setNewBoardTitle(e.target.value.trim());
                }}
                id="link"
                placeholder="Yeni Pano Başlığı"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  addBoard({
                    boardName: newBoardTitle,
                    email: user.email,
                  });
                  setNewBoardTitle("");
                }}
                className="bg-black hover:bg-slate-800 text-white"
                variant="secondary"
              >
                Ekle
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
