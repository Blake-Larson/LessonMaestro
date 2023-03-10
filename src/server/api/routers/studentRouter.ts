import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  getStudents: protectedProcedure.query(async ({ ctx }) => {
    const students = await ctx.prisma.student.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        phone: true,
        email: true,
        contact: true,
        instrument: true,
        status: true,
        image: true,
        music: true,
        work: true,
        lesson: true,
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
    return students;
  }),

  getStudentByID: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const students = await ctx.prisma.student.findMany({
        where: {
          userId,
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          age: true,
          phone: true,
          email: true,
          contact: true,
          instrument: true,
          status: true,
          image: true,
          music: true,
          work: true,
          lesson: true,
        },
      });
      return students[0];
    }),

  createStudent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.optional(z.number().gte(0).lt(150)),
        phone: z.string().optional(),
        email: z.string().optional(),
        contact: z.string().optional(),
        instrument: z.string().optional(),
        image: z.string().optional(),
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
          status: true,
          image: input.image,
          userId: userId,
        },
      });
      return studentForm;
    }),

  updateStudent: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        age: z.optional(z.number().gte(0).lt(150)),
        phone: z.string().optional(),
        email: z.string().optional(),
        contact: z.string().optional(),
        instrument: z.string().optional(),
        status: z.boolean().optional(),
        image: z.string().optional(),
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const currentStudent = await ctx.prisma.student.findMany({
        where: {
          id: input.id,
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          age: true,
          phone: true,
          email: true,
          contact: true,
          instrument: true,
          status: true,
          image: true,
          music: true,
          work: true,
          lesson: true,
        },
      });
      const studentForm = ctx.prisma.student.updateMany({
        where: {
          id: input.id,
          userId: userId,
        },
        data: {
          name: input.name ? input.name : currentStudent[0]?.name,
          age: input.age ? input.age : currentStudent[0]?.age,
          phone: input.phone ? input.phone : currentStudent[0]?.phone,
          email: input.email ? input.email : currentStudent[0]?.email,
          contact: input.contact ? input.contact : currentStudent[0]?.contact,
          instrument: input.instrument
            ? input.instrument
            : currentStudent[0]?.instrument,
          status: input.status ? input.status : currentStudent[0]?.status,
          image: input.image ? input.image : currentStudent[0]?.image,
        },
      });
      return studentForm;
    }),

  deleteStudent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.student.deleteMany({
        where: {
          userId,
          id: input.id,
        },
      });
    }),
});
