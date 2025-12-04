import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { StorageAdapter } from "./storage";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "avatars");

/**
 * Local filesystem storage adapter
 * Stores files in /public/uploads/avatars/
 */
export class LocalStorageAdapter implements StorageAdapter {
  async upload(
    file: Buffer,
    filename: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contentType: string
  ): Promise<string> {
    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate unique filename to avoid collisions
    const ext = path.extname(filename);
    const uniqueFilename = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    // Write file to disk
    await writeFile(filePath, file);

    // Return the public URL path
    return `/uploads/avatars/${uniqueFilename}`;
  }

  async delete(url: string): Promise<void> {
    // Extract filename from URL
    const filename = url.split("/").pop();
    if (!filename) return;

    const filePath = path.join(UPLOAD_DIR, filename);

    // Check if file exists before deleting
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }
}
