"use client";
import { Button } from "./ui/button";
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
import { ListPlus } from "lucide-react";
import { addList } from "../actions/tasks";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ListDialog = ({ boardId }) => {
  const [listName, setListName] = useState("");
  const router = useRouter(); //

  const handleAddList = async () => {
    await addList({
      boardId,
      listName,
      pathname: router.asPath,
    });
    setListName("");
    router.refresh();
  };

  return (
    <Dialog className="relative">
      <DialogTrigger asChild>
        <Button className="p-16 bg-white text-black mb-4 hover:bg-muted">
          <ListPlus className="w-4 h-4 mr-2" /> Yeni Liste Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Yeni Liste Ekle</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value.trim())}
              id="link"
              placeholder="Yeni Liste Başlığı"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-black hover:bg-slate-800 text-white"
              variant="secondary"
              onClick={handleAddList} // Burada handleAddList fonksiyonunu çağır
            >
              Ekle
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListDialog;
