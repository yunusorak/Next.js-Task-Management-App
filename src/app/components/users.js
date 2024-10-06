"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { User } from "lucide-react";

export default function Users({
  users,
  setUsers,
  selectedUsers,
  setSelectedUsers,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            {value
              ? users.find((user) => user.value === value)?.label
              : "Üyeler"}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Üyeleri ara..." className="h-9" />
          <CommandList>
            <CommandEmpty>Kullanıcı bulunamadı</CommandEmpty>
            <CommandGroup>
              {users.length > 0 &&
                users.map((user) => (
                  <CommandItem
                    key={user.value}
                    className="cursor-pointer"
                    value={user.value}
                    onSelect={(currentValue) => {
                      const selectedUser = users.find(
                        (u) => u.value === currentValue
                      );

                      if (
                        !selectedUsers.find(
                          (u) => u.value === selectedUser.value
                        )
                      ) {
                        // Eğer kullanıcı mevcut değilse ekle
                        setSelectedUsers((prevState) => [
                          ...prevState,
                          selectedUser,
                        ]);
                      } else {
                        // Eğer kullanıcı mevcutsa çıkar
                        setSelectedUsers((prevState) =>
                          prevState.filter(
                            (u) => u.value !== selectedUser.value
                          )
                        );
                      }
                    }}
                  >
                    {user.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedUsers.find((u) => u.value === user.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
