"use server";

import dbHelper from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { defaultLocale } from "../consts/lang";

export const getCheckSession = async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return { status: false, message: "Session cookie not found" };
  } else {
    await dbHelper.connect();
    const userCollection = await dbHelper.getCollection("users");

    const user = await userCollection.findOne({ password: session.value });

    if (!user) {
      return { status: false, message: "Kullanıcı bulunamadı" };
    }

    const { _id, ...rest } = user;
    const userWithIdString = { _id: _id.toString(), ...rest };

    return { status: true, user: userWithIdString };
  }
};

export const login = async (payload) => {
  await dbHelper.connect();

  const userCollection = await dbHelper.getCollection("users");
  const getHashPass = getJWT(payload.password);

  const user = await userCollection.findOne({
    email: payload.email,
  });

  if (!user) {
    return { status: false, message: "Kullanıcı bilgilerinde bir hata var!" };
  } else {
    const { _id, ...rest } = user;
    const userWithIdString = { _id: _id.toString(), ...rest };
    const decoded = jwt.verify(
      userWithIdString.password,
      process.env.JWT_SECRET
    );
    if (decoded.password === payload.password) {
      const cookieStore = cookies();
      cookieStore.set("session", rest.password);
      if (userWithIdString) redirect(`/${defaultLocale}/main`);
      return userWithIdString;
      // redirect(`/${defaultLocale}/main`);
    }
  }

  // redirect(`/${defaultLocale}/main`);
};

const getJWT = (password) => {
  return jwt.sign({ password }, process.env.JWT_SECRET);
};

export const register = async (payload) => {
  await dbHelper.connect();

  const userCollection = await dbHelper.getCollection("users");

  // console.log(await checkUserWithEmail(payload.email));
  if (await checkUserWithEmail(payload.email).status) {
    return {
      message: "Bu mail adresi kullanılmaktadır!",
      status: false,
    };
  } else {
    await dbHelper.connect();
    let passToken = getJWT(payload.password);
    // var passToken = jwt.sign({ password: payload.password }, "shhhhh");
    const register = await userCollection.insertOne({
      created_by: "task-management-app",
      created_at: new Date(),
      email: payload.email,
      password: passToken,
      name: payload.name,
      _id: new ObjectId(),
      task_ids: [], // eklenmeyebilir direkt taskslerden çekmeyi düşünüyorum
      status: "active",
      role: "user",
      profile_picture: "/assets/profile.png",
      last_login: null,
      bio: "",
      preferences: {
        theme: "light",
        notifications: true,
      },
      verified: false,
      activation_token: null,
    });

    return { message: "Başarıyla kayıt olundu", status: true };
  }
};

export const checkUserWithEmail = async (email) => {
  try {
    await dbHelper.connect();

    const userCollection = await dbHelper.getCollection("users");

    const user = await userCollection.findOne({ email });

    if (!user) {
      return { status: false, message: "Kullanıcı bulunamadı" };
    }

    const { _id, ...rest } = user;

    return { status: true, user: rest };
  } catch (err) {
    console.error("Error in checkUserWithEmail:", err);
    throw new Error("Error checking user");
  } finally {
    await dbHelper.close();
  }
};

export const logOut = (countryCode) => {
  const cookieStore = cookies();
  cookieStore.delete("session");
  redirect(`/${countryCode}/login`);
};
