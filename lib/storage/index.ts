import { env } from "@/env";
import type { StorageAdapter, StorageProvider } from "./storage";
import { LocalStorageAdapter } from "./local";
import { VercelBlobStorageAdapter } from "./vercel-blob";

/**
 * Get the storage adapter based on environment configuration
 * Defaults to local storage if STORAGE_PROVIDER is not set
 */
export function getStorageAdapter(): StorageAdapter {
  const provider: StorageProvider = env.STORAGE_PROVIDER || "local";

  switch (provider) {
    case "vercel-blob":
      if (!env.BLOB_READ_WRITE_TOKEN) {
        throw new Error(
          "BLOB_READ_WRITE_TOKEN is required when using vercel-blob storage provider"
        );
      }
      return new VercelBlobStorageAdapter();
    case "local":
    default:
      return new LocalStorageAdapter();
  }
}

// Re-export types
export type { StorageAdapter, StorageProvider };
