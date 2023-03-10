import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: userId,
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

  markCompleted: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const currentCompleted = await ctx.prisma.todo.findMany({
        where: {
          id: input.id,
          userId: userId,
        },
        select: {
          completed: true,
        },
      });
      await ctx.prisma.todo.updateMany({
        where: {
          id: input.id,
          userId: userId,
        },
        data: {
          completed: !currentCompleted[0]?.completed,
        },
      });
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
