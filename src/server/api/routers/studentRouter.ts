import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  getStudents: privateProcedure.query(async ({ ctx }) => {
    const students = await ctx.prisma.student.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        music: true,
        concept: true,
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

  getStudetsByNotMusicId: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const students = await ctx.prisma.student.findMany({
        where: {
          userId: ctx.userId,
          NOT: {
            music: {
              some: {
                id: input,
              },
            },
          },
        },
        include: {
          music: true,
          concept: true,
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

  getStudentByID: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const student = await ctx.prisma.student.findUnique({
        include: {
          music: true,
          concept: true,
          lesson: true,
        },
        where: {
          id: input.id,
        },
      });
      return student;
    }),

  createStudent: privateProcedure
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
          userId: ctx.userId,
        },
      });
      return studentForm;
    }),

  updateStudent: privateProcedure
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
      const currentStudent = await ctx.prisma.student.findUnique({
        where: {
          id: input.id,
        },
      });
      const studentForm = ctx.prisma.student.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name ? input.name : currentStudent?.name,
          age: input.age ? input.age : currentStudent?.age,
          phone: input.phone ? input.phone : currentStudent?.phone,
          email: input.email ? input.email : currentStudent?.email,
          contact: input.contact ? input.contact : currentStudent?.contact,
          instrument: input.instrument
            ? input.instrument
            : currentStudent?.instrument,
          status: input.status ? input.status : currentStudent?.status,
          image: input.image ? input.image : currentStudent?.image,
        },
      });
      return studentForm;
    }),

  updateStatus: privateProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const currentStatus = await ctx.prisma.student.findMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
        select: {
          status: true,
        },
      });
      await ctx.prisma.student.updateMany({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
        data: {
          status: !currentStatus[0]?.status,
        },
      });
    }),

  deleteStudent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.student.delete({
        where: {
          id: input.id,
        },
      });
    }),

  connectMusictoStudent: privateProcedure
    .input(
      z.object({
        musicId: z.string(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newConnection = ctx.prisma.student.update({
        where: {
          id: input.studentId,
        },
        data: {
          music: {
            connect: { id: input.musicId },
          },
        },
      });
      return newConnection;
    }),

  disconnectMusicFromStudent: privateProcedure
    .input(
      z.object({
        musicId: z.string(),
        studentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const disconnect = ctx.prisma.student.update({
        where: {
          id: input.studentId,
        },
        data: {
          music: {
            disconnect: { id: input.musicId },
          },
        },
      });
      return disconnect;
    }),
});
