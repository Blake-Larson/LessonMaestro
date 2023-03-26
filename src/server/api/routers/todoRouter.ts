import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: privateProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.userId,
      },
    });
    return todos;
  }),

  createTodo: privateProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todoForm = ctx.prisma.todo.create({
        data: {
          text: input.text,
          completed: false,
          userId: ctx.userId,
        },
      });
      return todoForm;
    }),

  markCompleted: privateProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const currentCompleted = await ctx.prisma.todo.findMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
        select: {
          completed: true,
        },
      });
      await ctx.prisma.todo.updateMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
        data: {
          completed: !currentCompleted[0]?.completed,
        },
      });
    }),

  deleteTodo: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.todo.deleteMany({
        where: {
          userId: ctx.userId,
          id: input.id,
        },
      });
    }),
});
