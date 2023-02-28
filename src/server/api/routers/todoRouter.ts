import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      select: {
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

  markCompleted: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.todo.updateMany({
        where: {
          text: input.text,
          userId: userId,
        },
        data: {
          completed: !input.completed,
        },
      });
    }),

  deleteTodo: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.todo.deleteMany({
        where: {
          userId,
          text: input.text,
        },
      });
    }),
});
