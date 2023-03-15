import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const musicRouter = createTRPCRouter({
  getMusic: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const music = await ctx.prisma.music.findMany({
        where: {
          studentId: input,
        },
        select: {
          id: true,
          title: true,
          composer: true,
        },
      });
      return music;
    }),

  createMusicItem: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
        title: z.string(),
        composer: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const todoForm = ctx.prisma.music.create({
        data: {
          studentId: input.studentId,
          title: input.title,
          composer: input.composer,
        },
      });
      return todoForm;
    }),

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
