"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { create, deleteById, toggleById } from "@/actions";
import { useRef } from "react";
import { Todo } from "@repo/database";

export function TodoListComponent({ todos }: { todos: Todo[] }) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-md w-[500px] mx-auto p-6 bg-white rounded-lg shadow dark:bg-neutral-950">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <form
        ref={ref}
        action={async (formData) => {
          const title = formData.get("title") as string;
          if (title) {
            await create(title);
          }
          ref.current?.reset();
        }}
      >
        <div className="flex mb-4">
          <Input
            type="text"
            name="title"
            placeholder="Add a new todo"
            className="mr-2"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
      <ul className="space-y-2">
        {todos.map((todo: any) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white p-3 rounded dark:bg-neutral-950"
          >
            <div className="flex items-center">
              <Checkbox
                id={`checkbox-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={async () => {
                  await toggleById(todo.id, todo.completed);
                }}
                className="mr-2"
              />
              <label
                htmlFor={`checkbox-${todo.id}`}
                className={`cursor-pointer ${
                  todo.completed
                    ? "line-through text-neutral-500 dark:text-neutral-400"
                    : ""
                }`}
              >
                {todo.title}
              </label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                await deleteById(todo.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
