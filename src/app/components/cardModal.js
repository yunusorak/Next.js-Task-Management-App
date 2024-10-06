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
import {
  AlignJustify,
  CheckCheck,
  ClipboardList,
  ListTodo,
  Pencil,
} from "lucide-react";
import "react-quill/dist/quill.snow.css";
import TextEditor from "./textEditor";
import TagSection from "./tagSection";
import CardModalLeftSection from "./cardModalRightSection";
import { useState } from "react";
import TodoList from "./todoList";
import { membersInitialState } from "../consts/initialStates";

const CardModal = ({ task, boardId, listId }) => {
  const [users, setUsers] = useState(
    task.members && task.members.length > 0
      ? task.members
      : membersInitialState || []
  );
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [date, setDate] = useState(task.due_date || "");
  const [listTitle, setListTitle] = useState(task.title || "");
  const [todos, setTodos] = useState(task.checklist || []);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 hidden group-hover:block transition" />
            <span className="sr-only">Düzenle</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center">
                <ClipboardList className="w-4 h-4 mr-2" />
                <h5 className="font-bold">Kart Yapılandırması</h5>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="d-flex gap-3">
                <p className="underline inline">{task.title}</p> Listesinde
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex">
            <div className="card-modal-left-section w-[70%]">
              <div className="flex gap-4">
                <div
                  className={`card-modal-users-box w-[50%] ${
                    selectedUsers.length === 0 ? "hidden" : "block"
                  }`}
                >
                  {selectedUsers.length > 0 && (
                    <h5 className="font-bold text-muted-foreground">Üyeler</h5>
                  )}
                  <div className="flex gap-2 mb-4">
                    {selectedUsers.map((user) => (
                      <p key={user.value}>{user.label}</p>
                    ))}
                  </div>
                </div>
                <div className="card-modal-users-box w-[50%]">
                  {date !== "" && (
                    <h5 className="font-bold text-muted-foreground">Tarih</h5>
                  )}
                  <div className="flex gap-2 mb-4">{date}</div>
                </div>
              </div>
              <TagSection
                boardId={boardId}
                listId={listId}
                labels={task.labels}
              />
              <div>
                <div className="flex items-center">
                  <AlignJustify className="w-4 h-4 mr-2 text-muted-foreground" />
                  <h5 className="font-bold text-muted-foreground">Açıklama</h5>
                </div>
                <div className="mb-8 h-full w-full border-gray-300">
                  <TextEditor />
                </div>
              </div>

              <div>
                {listTitle !== "" ? (
                  <div className="flex items-center">
                    <ListTodo className="w-4 h-4 text-muted-foreground mr-2" />
                    <h5 className="font-bold text-muted-foreground uppercase">
                      {listTitle}
                    </h5>
                  </div>
                ) : (
                  ""
                )}

                {todos.length > 0 && <TodoList todos={todos} />}
              </div>

              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    className="w-[75%]"
                    id="link"
                    value={task.title}
                    placeholder="Yeni kart ismi"
                  />
                </div>
              </div>
            </div>

            <div className="card-modal-left-section ms-auto w-[30%]">
              <CardModalLeftSection
                setTodos={setTodos}
                setListTitle={setListTitle}
                listTitle={listTitle}
                todos={todos}
                setDate={setDate}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                users={users}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-black hover:bg-slate-800 text-white"
                variant="secondary"
              >
                Tamamla <CheckCheck className="w-4 h-4 ml-4" />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardModal;
