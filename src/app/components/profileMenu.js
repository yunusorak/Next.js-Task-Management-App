"use client";

import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LogOutIcon,
  UserIcon,
  GlobeIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { logOut } from "../actions/auth";

export default function ProfileMenu({ user, countryCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (user && user.profile_picture) {
      setImageUrl(user.profile_picture);
    } else {
      setImageUrl(null); //
    }
  }, [user]);

  return (
    <div className="w-64 ms-auto p-4 rounded-lg">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={
                  user && user.profile_picture
                    ? user.profile_picture
                    : "/public/assets/profile.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">
              {user ? user.email : "Kullanıcı bilgisi yükleniyor..."}
            </span>
          </div>
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <GlobeIcon className="mr-2 h-4 w-4" />
            <span>Dil Seçimi</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5 flex justify-around">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`w-10 h-6 rounded-sm flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-colors 
                        ${
                          countryCode === "tr"
                            ? "bg-slate-800"
                            : "bg-red-300 hover:bg-red-400"
                        }`}
                  >
                    TR
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Türkçe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`w-10 h-6 rounded-sm flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-colors ${
                      countryCode === "en"
                        ? "bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    EN
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>English</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              logOut(countryCode);
            }}
            className="cursor-pointer"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Çıkış Yap</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
