import prisma from "@repo/database";
import { TodoListComponent } from "./todo-list";

export default async function IndexPage() {
  const todos = await prisma.todo.findMany();
  return (
    <div className="flex items-center h-full">
      <TodoListComponent todos={todos} />
    </div>
  );
}
