import { createTRPCRouter, protectedProcedure } from "../init";
import { auth } from "@/lib/auth";

export const userRouter = createTRPCRouter({
  listTwoFactorBackupCodes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session!.user.id;

    const data = await auth.api.viewBackupCodes({
      body: {
        userId,
      },
    });

    return data;
  }),
});
