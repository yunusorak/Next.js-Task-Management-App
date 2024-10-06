"use client";
import { getBoardListsWithId } from "@/app/actions/tasks";
import ListDialog from "@/app/components/listDialog";
import TaskList from "@/app/components/task";
import { useEffect, useState } from "react";

const Board = ({ params }) => {
  const [listId, setListId] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getBoardListsWithId(params.boardId);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [params.boardId, tasks]);

  return (
    <>
      <ListDialog boardId={params.boardId} />

      {/* TASK LİST HAZIR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.listId.toString()}>
              <TaskList
                taskName={task.name}
                tasksP={task.tasks}
                listId={task.listId}
                boardId={params.boardId}
              />
            </div>
          ))
        ) : (
          <h5>Liste bulunamadı.</h5>
        )}
      </div>

      {/* <TaskList listId={listId} boardId={params.boardId} /> */}
      {/* TASK LİST HAZIR */}
    </>
  );
};

export default Board;
