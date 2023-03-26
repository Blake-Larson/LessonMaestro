import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "../trpc";

export const musicRouter = createTRPCRouter({
  getMusic: privateProcedure.query(async ({ ctx }) => {
    const music = await ctx.prisma.music.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        student: true,
      },
      orderBy: [
        {
          title: "asc",
        },
      ],
    });
    return music;
  }),

  getMusicById: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const music = await ctx.prisma.music.findUnique({
        include: {
          student: true,
        },
        where: {
          id: input,
        },
      });
      return music;
    }),

  getMusicByStudentId: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const music = await ctx.prisma.music.findMany({
        where: {
          userId: ctx.userId,
          NOT: {
            student: {
              some: {
                id: input,
              },
            },
          },
        },
        orderBy: [
          {
            title: "asc",
          },
        ],
      });
      return music;
    }),

  createMusicItem: privateProcedure
    .input(
      z.object({
        title: z.string(),
        composer: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const musicForm = ctx.prisma.music.create({
        data: {
          title: input.title,
          composer: input.composer,
          year: input.year,
          userId: ctx.userId,
        },
      });
      return musicForm;
    }),

  updateMusicItem: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        composer: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const currentMusicItem = await ctx.prisma.music.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          title: true,
          composer: true,
          year: true,
        },
      });
      const musicItem = ctx.prisma.music.updateMany({
        where: {
          id: input.id,
        },
        data: {
          title: input.title ? input.title : currentMusicItem?.title,
          composer: input.composer
            ? input.composer
            : currentMusicItem?.composer,
          year: input.year ? input.year : currentMusicItem?.year,
        },
      });
      return musicItem;
    }),

  deleteMusicItem: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.music.delete({
        where: {
          id: input,
        },
      });
    }),
});
