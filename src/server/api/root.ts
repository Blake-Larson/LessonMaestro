import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { lessonRouter } from "./routers/lessonRouter";
import { studentRouter } from "./routers/studentRouter";
import { todoRouter } from "./routers/todoRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  lesson: lessonRouter,
  student: studentRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
