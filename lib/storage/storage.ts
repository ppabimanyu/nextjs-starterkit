/**
 * Storage adapter interface for file uploads
 */
export interface StorageAdapter {
  /**
   * Upload a file to storage
   * @param file - Buffer containing the file data
   * @param filename - Original filename
   * @param contentType - MIME type of the file
   * @returns Promise resolving to the public URL of the uploaded file
   */
  upload(file: Buffer, filename: string, contentType: string): Promise<string>;

  /**
   * Delete a file from storage
   * @param url - The public URL of the file to delete
   */
  delete(url: string): Promise<void>;
}

/**
 * Supported storage providers
 */
export type StorageProvider = "local" | "vercel-blob";
