"use client";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/app/components/ui/sheet";
import { Archive, InboxIcon, MenuIcon, PlusCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/app/components/ui/input";
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
import { addBoard, getBoardsWithEmail } from "@/app/actions/tasks";
import { useEffect, useState } from "react";
import useUserStore from "@/app/store/userStore";
import { getCheckSession } from "@/app/actions/auth";
import ProfileMenu from "@/app/components/profileMenu";
import { usePathname } from "next/navigation";
import { defaultLocale } from "@/app/consts/lang";
import { Button } from "@/app/components/ui/button";

export default function Layout({ children, params }) {
  const pathname = usePathname();
  const splittedPath = pathname.split("/");
  const lastPath = splittedPath[splittedPath.length - 1];

  const { setUser, setBoards } = useUserStore();
  const user = useUserStore((state) => state.user);
  const boards = useUserStore((state) => state.boards);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const response = await getCheckSession();
      setUser(response.user);
    };

    checkSession();
  }, [setUser]);

  useEffect(() => {
    const fetchBoards = async () => {
      if (user?.email) {
        const response = await getBoardsWithEmail(user.email);
        setBoards(response);
      }
    };

    if (user?.email) {
      fetchBoards();
    }
  }, [user?.email]);

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[17.5%_1fr] dark:bg-gray-900">
      <div className="hidden border-r lg:block dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6 justify-between">
            <Link
              href={`/${defaultLocale}/main`}
              className="flex items-center gap-2 font-semibold dark:text-white"
              prefetch={false}
            >
              <InboxIcon className="h-6 w-6" />
              <span className="">My Tasks</span>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="dark:bg-gray-800 dark:text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">
                    Yeni Pano Ekle
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      value={boardTitle}
                      onChange={(e) => {
                        setBoardTitle(e.target.value.trim());
                      }}
                      id="link"
                      placeholder="Yeni Pano Başlığı"
                      className="dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        addBoard({
                          boardName: boardTitle,
                          email: user.email,
                        });
                        setBoardTitle("");
                      }}
                      className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
                      variant="secondary"
                    >
                      Ekle
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <div className="rounded-lg mb-4">
                <Link
                  href={`/${params.countryCode}/main`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted cursor-pointer dark:text-white dark:bg-gray-800"
                  prefetch={false}
                >
                  <div className="flex items-center gap-3">
                    <InboxIcon className="h-4 w-4" />
                    Panolar
                  </div>
                </Link>
                <div className="mt-2 pl-6 space-y-2">
                  {boards.map((board) => (
                    <Link
                      key={board.boardId}
                      href={`/${params.countryCode}/main/board/${board.boardId}`}
                      className={`block hover:bg-muted p-2 text-sm text-muted-foreground hover:text-primary transition-colors dark:hover:bg-gray-700 dark:text-gray-300 ${
                        lastPath === board.boardId
                          ? "bg-muted dark:bg-gray-700"
                          : ""
                      }`}
                      prefetch={false}
                    >
                      {board.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg mt-4">
                <Link
                  href={`/${params.countryCode}/main/archive`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  prefetch={false}
                >
                  <Archive className="h-4 w-4" />
                  Arşiv
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6 dark:border-gray-700">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden dark:bg-gray-800 dark:text-white"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="sm:max-w-xs bg-white dark:bg-gray-900"
            >
              {/* Mobile menu content */}
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <ProfileMenu user={user} countryCode={params.countryCode} />
          </div>
        </header>
        <main className="flex-1 w-full px-4 py-6 sm:px-6 md:px-8 dark:bg-gray-900 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
