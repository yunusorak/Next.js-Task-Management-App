"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Archive, ArchiveRestore } from "lucide-react";

export default function ArchiveCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleArchive = () => {
    console.log("Card archived");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100 bg-white border"
        >
          <ArchiveRestore className="mr-2 h-4 w-4" />
          Arşiv
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Kartı Arşivle</DialogTitle>
          <DialogDescription>
            Bu kartı arşivlemek istediğinizden emin misiniz? Arşivlenen kartlar
            listeden kaldırılır ancak daha sonra geri yüklenebilir.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            İptal
          </Button>
          <Button onClick={handleArchive}>Arşivle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
