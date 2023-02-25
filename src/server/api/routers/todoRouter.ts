import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      select: {
        id: true,
        text: true,
        completed: true,
      },
    });
    return todos;
  }),

  createTodo: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const todoForm = ctx.prisma.todo.create({
        data: {
          text: input.text,
          completed: false,
          userId: userId,
        },
      });
      return todoForm;
    }),

  deleteTodo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.todo.deleteMany({
        where: {
          userId,
          id: input.id,
        },
      });
    }),
});
