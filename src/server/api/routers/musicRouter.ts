import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const musicRouter = createTRPCRouter({
  getMusic: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const music = await ctx.prisma.music.findMany({
      where: {
        userId: userId,
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

  getMusicById: protectedProcedure
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

  getMusicByStudentId: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const music = await ctx.prisma.music.findMany({
        where: {
          userId: userId,
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

  createMusicItem: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        composer: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const musicForm = ctx.prisma.music.create({
        data: {
          title: input.title,
          composer: input.composer,
          year: input.year,
          userId: userId,
        },
      });
      return musicForm;
    }),

  updateMusicItem: protectedProcedure
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

  deleteMusicItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.music.delete({
        where: {
          id: input,
        },
      });
    }),
});
