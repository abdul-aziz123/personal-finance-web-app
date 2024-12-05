"use server";

import { signIn, signOut } from "@/auth";

export const logout = async () => {
  await signOut();
};

export const signInWithGithub = async () => {
  await signIn("github");
};

export const signInWithGoogle = async () => {
  await signIn("google");
};
