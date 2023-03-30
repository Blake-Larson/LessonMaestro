import { createTRPCRouter } from "./trpc";
import { todoRouter } from "./routers/todoRouter";
import { studentRouter } from "./routers/studentRouter";
import { lessonRouter } from "./routers/lessonRouter";
import { musicRouter } from "./routers/musicRouter";
import { conceptRouter } from "./routers/conceptRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  student: studentRouter,
  lesson: lessonRouter,
  music: musicRouter,
  concept: conceptRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
