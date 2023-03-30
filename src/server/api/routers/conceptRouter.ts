import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const conceptRouter = createTRPCRouter({
  getConcepts: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const concepts = await ctx.prisma.concept.findMany({
        where: {
          userId: ctx.userId,
          studentId: input,
        },
      });
      return concepts;
    }),
  createConcept: privateProcedure
    .input(
      z.object({
        text: z.string(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conceptForm = ctx.prisma.concept.create({
        data: {
          text: input.text,
          studentId: input.studentId,
          userId: ctx.userId,
        },
        select: { id: true },
      });
      return conceptForm;
    }),

  connectConcepttoStudent: privateProcedure
    .input(
      z.object({
        conceptId: z.string(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newConnection = ctx.prisma.student.update({
        where: {
          id: input.studentId,
        },
        data: {
          concepts: {
            connect: { id: input.conceptId },
          },
        },
      });
      return newConnection;
    }),
  deleteConcept: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.concept.delete({
        where: {
          id: input,
        },
      });
    }),
});
