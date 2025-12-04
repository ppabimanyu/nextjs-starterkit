import { put, del } from "@vercel/blob";
import path from "path";
import type { StorageAdapter } from "./storage";
import { env } from "@/env";

/**
 * Vercel Blob storage adapter
 * Uses Vercel Blob for CDN-backed file storage
 */
export class VercelBlobStorageAdapter implements StorageAdapter {
  async upload(
    file: Buffer,
    filename: string,
    contentType: string
  ): Promise<string> {
    // Generate unique filename
    const ext = path.extname(filename);
    const uniqueFilename = `avatars/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}${ext}`;

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
      contentType,
      token: env.BLOB_READ_WRITE_TOKEN,
    });

    return blob.url;
  }

  async delete(url: string): Promise<void> {
    try {
      await del(url, {
        token: env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (error) {
      // Ignore errors if file doesn't exist
      console.error("Failed to delete blob:", error);
    }
  }
}
