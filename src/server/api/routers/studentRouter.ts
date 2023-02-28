import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  createStudent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number().gt(0).lt(150),
        phone: z.string(),
        email: z.string(),
        contact: z.string(),
        instrument: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const studentForm = ctx.prisma.student.create({
        data: {
          name: input.name,
          age: input.age,
          phone: input.phone,
          email: input.email,
          contact: input.contact,
          instrument: input.instrument,
          userId: userId,
        },
      });
      return studentForm;
    }),
});
