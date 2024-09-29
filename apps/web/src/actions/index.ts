"use server";
import prisma from "@repo/database";
import { revalidatePath } from "next/cache";

export async function create(title: string) {
  await prisma.todo.create({
    data: {
      title: title,
    },
  });

  revalidatePath("/");
}

export async function deleteById(id: string) {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
}

export async function toggleById(id: string, completed: boolean) {
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/");
}
