import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getLessons: privateProcedure.query(async ({ ctx }) => {
    const lessons = await ctx.prisma.lesson.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        student: {
          include: {
            music: true,
            concepts: true,
          },
        },
      },
      orderBy: [
        {
          startDate: "asc",
        },
      ],
      take: 10,
    });
    return lessons;
  }),
  createLesson: privateProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const lessonForm = ctx.prisma.lesson.create({
        data: {
          archived: false,
          startDate: input.startDate,
          endDate: input.endDate,
          studentId: input.studentId,
          userId: ctx.userId,
        },
        select: { id: true },
      });
      return lessonForm;
    }),

  connectLessontoStudent: privateProcedure
    .input(
      z.object({
        lessonId: z.string(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newConnection = ctx.prisma.student.update({
        where: {
          id: input.studentId,
        },
        data: {
          lessons: {
            connect: { id: input.lessonId },
          },
        },
      });
      return newConnection;
    }),
  deleteLesson: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.lesson.delete({
        where: {
          id: input,
        },
      });
    }),
});
