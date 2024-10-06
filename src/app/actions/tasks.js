"use server";

import dbHelper from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// Pano ekleme fonksiyonu
export const addBoard = async (payload) => {
  await dbHelper.connect();

  const boardsCollection = await dbHelper.getCollection("boards");

  const response = await boardsCollection.insertOne({
    boardId: new ObjectId(),
    name: payload.boardName,
    description: "",
    created_by: payload.email,
    members: [],
    lists: [],
    created_at: new Date(),
    updated_at: new Date(),
    archive: false,
  });

  await dbHelper.close();

  return { message: "Pano başarıyla oluşturuldu", status: true };
};

// Kullanıcıya göre panoları getirme fonksiyonu
export const getBoardsWithEmail = async (email) => {
  await dbHelper.connect();
  const boardsCollection = await dbHelper.getCollection("boards");

  const boards = await boardsCollection.find({ created_by: email }).toArray();

  const fixedBoards = boards.map((board) => {
    return convertMongoObject(board);
  });

  await dbHelper.close();

  return fixedBoards;
};

const convertMongoObject = (object) => {
  if (!object) {
    throw new Error("Invalid object provided");
  }

  return {
    _id: object._id.toString(),
    boardId: object.boardId.toString(),
    name: object.name,
    description: object.description,
    created_by: object.created_by,
    members: object.members, // Üyeler zaten düz bir dizi
    lists: object.lists.map((list) => ({
      listId: list.listId.toString(), // listId'yi string'e çevir
      name: list.name,
      tasks: list.tasks, // Görevler zaten düz bir dizi
      created_at: list.created_at,
      updated_at: list.updated_at,
    })),
    created_at: object.created_at,
    updated_at: object.updated_at,
    archive: object.archive,
  };
};

export const getBoardListsWithId = async (boardId) => {
  await dbHelper.connect();
  const boardsCollection = await dbHelper.getCollection("boards");

  const tasks = await boardsCollection
    .find({ boardId: new ObjectId(boardId) })
    .toArray();

  await dbHelper.close();
  if (tasks) return tasks[0].lists;
};
export const addList = async (payload) => {
  console.log("Payload:", payload);
  if (!payload || !payload.boardId || !payload.listName) {
    throw new Error("Invalid payload");
  }

  await dbHelper.connect();
  const boardsCollection = await dbHelper.getCollection("boards");

  await boardsCollection.updateOne(
    { boardId: new ObjectId(payload.boardId) },
    {
      $push: {
        lists: {
          listId: new ObjectId(),
          name: payload.listName,
          tasks: [],
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      $set: {
        updated_at: new Date(),
      },
    }
  );

  if (payload.pathname) {
    console.log("Revalidating path:", payload.pathname);
    revalidatePath(payload.pathname);
  } else {
    console.warn("pathname is undefined");
  }

  await dbHelper.close();
};

// Görev ekleme fonksiyonu
export const addTasks = async (payload) => {
  await dbHelper.connect();
  const boardsCollection = await dbHelper.getCollection("boards");

  try {
    const result = await boardsCollection.updateOne(
      {
        boardId: new ObjectId(payload.boardId),
        "lists.listId": new ObjectId(payload.listId),
      },
      {
        $push: {
          "lists.$.tasks": {
            id: new ObjectId(),
            title: payload.taskTitle,
            description: "",
            status: "open",
            members: [],
            due_date: "",
            labels: [],
            comments: [],
            checklist: [],
            share: false,
            archive: false,
          },
        },
        $set: { updated_at: new Date() },
      }
    );

    revalidatePath(payload.pathname);
  } catch (error) {
    console.error("Error updating tasks:", error);
  } finally {
    await dbHelper.close();
  }
};
export const addLabelToList = async ({ boardId, listId, label }) => {
  try {
    await dbHelper.connect();
    const boardsCollection = await dbHelper.getCollection("boards");

    const result = await boardsCollection.updateOne(
      { boardId: new ObjectId(boardId), "lists.listId": new ObjectId(listId) },
      {
        $addToSet: {
          "lists.$.labels": label,
        },
      }
    );

    console.log("Güncelleme Sonucu:", result);
  } catch (error) {
    console.error("Veritabanı Güncelleme Hatası:", error);
  } finally {
    await dbHelper.close();
  }
};
