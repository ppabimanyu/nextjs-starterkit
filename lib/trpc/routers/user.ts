import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../init";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    const user = await ctx.db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session!.user.id;

      const existingUser = await ctx.db.user.findFirst({
        where: {
          email: input.email,
          NOT: {
            id: userId,
          },
        },
        select: {
          id: true,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists",
        });
      }

      await ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),

  changePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string(),
        newPassword: z
          .string()
          .min(8, "Password must be at least 8 characters long"),
      })
    )
    .mutation(async ({ input }) => {
      await auth.api.changePassword({
        headers: await headers(),
        body: {
          newPassword: input.newPassword,
          currentPassword: input.currentPassword,
          revokeOtherSessions: true,
        },
      });
    }),

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    await ctx.db.user.delete({
      where: {
        id: userId,
      },
    });

    await auth.api.signOut({
      headers: await headers(),
    });
  }),
});
