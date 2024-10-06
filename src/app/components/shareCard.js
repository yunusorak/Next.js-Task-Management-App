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
import { Input } from "./ui/input";
import { Share2, Copy, Check } from "lucide-react";

const ShareCard = ({ cardId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/share/${cardId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 bg-white border hover:bg-gray-100 rounded-md p-4"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Paylaş
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Kartı Paylaş</DialogTitle>
          <DialogDescription>
            Bu link ile kartınızı herkesle paylaşabilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={shareUrl} readOnly />
          <Button size="icon" onClick={handleCopy}>
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>Kapat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ShareCard;
