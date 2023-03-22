import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const musicRouter = createTRPCRouter({
  getMusic: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const music = await ctx.prisma.music.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        title: true,
        composer: true,
        year: true,
        userId: true,
        studentMusic: true,
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
            studentMusic: {
              some: {
                studentId: input,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          composer: true,
          year: true,
          userId: true,
        },
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

  //create update music item that adds students to music item

  updateMusicItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        composer: z.string().optional(),
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
        },
      });
      return musicItem;
    }),

  deleteMusicItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.music.deleteMany({
        where: {
          id: input,
        },
      });
    }),
});
