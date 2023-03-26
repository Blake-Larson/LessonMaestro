import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  // getLessons: privateProcedure.query(async ({ ctx }) => {
  //   const lessons = await ctx.prisma.lesson.findMany({
  //     select: {
  //       archived: true,
  //       attendance: true,
  //       date: true,
  //       id: true,
  //       payment: true,
  //     },
  //   });
  //   return lessons;
  // }),
});
