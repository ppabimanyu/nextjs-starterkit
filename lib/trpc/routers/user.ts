import { createTRPCRouter, protectedProcedure } from "../init";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { getStorageAdapter } from "@/lib/storage";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";

// Maximum file size: 800KB
const MAX_FILE_SIZE = 800 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const uploadAvatarSchema = z.object({
  fileBase64: z.string().min(1, "File data is required"),
  fileName: z.string().min(1, "File name is required"),
  contentType: z.string().refine((type) => ALLOWED_TYPES.includes(type), {
    message: "Invalid file type. Allowed: JPG, PNG, GIF, WebP",
  }),
});

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

  /**
   * Upload or update user avatar
   */
  uploadAvatar: protectedProcedure
    .input(uploadAvatarSchema)
    .mutation(async ({ ctx, input }) => {
      const currentImage = ctx.session!.user.image;

      // Decode base64 file data
      const fileBuffer = Buffer.from(input.fileBase64, "base64");

      // Validate file size
      if (fileBuffer.length > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024}KB`,
        });
      }

      const storage = getStorageAdapter();

      // Delete old avatar if it exists and is stored locally or in blob storage
      if (currentImage) {
        try {
          await storage.delete(currentImage);
        } catch {
          // Ignore deletion errors for external images (e.g., OAuth providers)
        }
      }

      // Upload new avatar
      const newImageUrl = await storage.upload(
        fileBuffer,
        input.fileName,
        input.contentType
      );

      // Update user profile with new image URL
      await auth.api.updateUser({
        body: {
          image: newImageUrl,
        },
        headers: await headers(),
      });

      return {
        imageUrl: newImageUrl,
        message: "Avatar uploaded successfully",
      };
    }),

  /**
   * Delete user avatar
   */
  deleteAvatar: protectedProcedure.mutation(async ({ ctx }) => {
    const currentImage = ctx.session!.user.image;

    if (!currentImage) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No avatar to delete",
      });
    }

    const storage = getStorageAdapter();

    // Delete the avatar from storage
    try {
      await storage.delete(currentImage);
    } catch {
      // Ignore deletion errors for external images
    }

    // Update user profile to remove image
    await auth.api.updateUser({
      body: {
        image: null as unknown as string,
      },
      headers: await headers(),
    });

    return {
      message: "Avatar deleted successfully",
    };
  }),
});
