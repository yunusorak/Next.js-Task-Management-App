import { Button } from "./ui/button";
import { Archive, Calendar, Settings, Share2 } from "lucide-react";
import Users from "./users";
import { Dates } from "./dates";
import { usePathname } from "next/navigation";
import TaskDialog from "./taskDialog";
import ArchiveCard from "./archiveCard";
import ShareCard from "./shareCard";

const CardModalLeftSection = ({
  users,
  setUsers,
  setDate,
  selectedUsers,
  setSelectedUsers,
  todos,
  setTodos,
  setListTitle,
  listTitle,
}) => {
  const pathname = usePathname();
  const countryCode = pathname.split("/")[1];

  return (
    <div className="card-modal-leftsection">
      <h5 className="font-bold text-muted-foreground ps-4">Karta ekle</h5>
      {/* Sidebar */}
      <aside className="bg-white">
        <nav className="p-4 space-y-2">
          <Users
            users={users}
            setUsers={setUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
          <Dates locale={countryCode} UIsetDate={setDate} />
          <TaskDialog
            setTodos={setTodos}
            setListTitle={setListTitle}
            listTitle={listTitle}
            todos={todos}
          />

          <ArchiveCard />
          <ShareCard cardId="random-test" />
        </nav>
      </aside>
    </div>
  );
};

export default CardModalLeftSection;
