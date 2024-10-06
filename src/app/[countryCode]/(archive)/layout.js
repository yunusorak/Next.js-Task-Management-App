import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import {
  Archive,
  ArchiveIcon,
  ArchiveXIcon,
  FileIcon,
  InboxIcon,
  MenuIcon,
  PlusCircle,
  SendIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";
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

export default function Layout({ children, params }) {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[17.5%_1fr]">
      <div className="hidden border-r lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6 justify-between">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <InboxIcon className="h-6 w-6" />
              <span className="">My Tasks</span>
            </Link>
            {/* <Button>
              <PlusCircle className="h-4 w-4" />
            </Button> */}
            <Dialog className="relative">
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="h-4 w-4" />
                </Button>
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
                    <Input id="link" placeholder="Yeni Pano Başlığı" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
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
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <div className="rounded-lg mb-4">
                <Link
                  href={`/${params.countryCode}/main`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primar cursor-pointer"
                  prefetch={false}
                >
                  <div className="flex items-center gap-3">
                    <InboxIcon className="h-4 w-4" />
                    Panolar
                  </div>
                </Link>
                <div className="mt-2 pl-6 space-y-2">
                  <Link
                    href={`/${params.countryCode}/main/board/1`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Pano 1
                  </Link>
                </div>
              </div>

              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <FileIcon className="h-4 w-4" />
                Drafts
              </Link> */}
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <SendIcon className="h-4 w-4" />
                Sent
              </Link> */}

              <Link
                href={`/${params.countryCode}/archive`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-gray-100"
                prefetch={false}
              >
                <Archive className="h-4 w-4" />
                Arşiv
              </Link>
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <Trash2Icon className="h-4 w-4" />
                Trash
              </Link> */}
              {/* <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <ArchiveIcon className="h-4 w-4" />
                Archived
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <ArchiveXIcon className="h-4 w-4" />
                Spam
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Contacts
              </Link> */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-white">
              <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                  <Link
                    href="#"
                    className="flex items-center gap-2 font-semibold"
                    prefetch={false}
                  >
                    <InboxIcon className="h-6 w-6" />
                    <span className="">My Tasks</span>
                  </Link>
                </div>
                <div className="flex-1">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted"
                      prefetch={false}
                    >
                      <InboxIcon className="h-4 w-4" />
                      Inbox
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <FileIcon className="h-4 w-4" />
                      Drafts
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <SendIcon className="h-4 w-4" />
                      Sent
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <Trash2Icon className="h-4 w-4" />
                      Trash
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <ArchiveIcon className="h-4 w-4" />
                      Archived
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <ArchiveXIcon className="h-4 w-4" />
                      Spam
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted dark:hover:bg-slate-700"
                      prefetch={false}
                    >
                      <UsersIcon className="h-4 w-4" />
                      Contacts
                    </Link>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex-1" />
        </header>
        <main className="flex-1 w-full px-4 py-6 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
