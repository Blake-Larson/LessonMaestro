import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  getLessons: protectedProcedure.query(async ({ ctx }) => {
    const lessons = await ctx.prisma.lesson.findMany({
      select: {
        archived: true,
        attendance: true,
        date: true,
        id: true,
        payment: true,
      },
    });
    return lessons;
  }),
});
