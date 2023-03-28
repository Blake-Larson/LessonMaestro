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
            concept: true,
          },
        },
      },
      orderBy: [
        {
          date: "asc",
        },
      ],
    });
    return lessons;
  }),
});
