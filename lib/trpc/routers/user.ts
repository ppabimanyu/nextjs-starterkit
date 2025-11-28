import { baseProcedure, createTRPCRouter } from "../init";
import { z } from "zod";

const getUserByEmailSchema = z.object({
  email: z.email(),
});

export const userRouter = createTRPCRouter({
  checkUserByEmail: baseProcedure
    .input(getUserByEmailSchema)
    .mutation(({ input, ctx }) => {
      const user = ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
        },
      });
      return user;
    }),
});
