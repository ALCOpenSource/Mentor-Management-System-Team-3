/**
 * Represents an image with a URL and optionally a public ID for Cloudinary.
 * If you are not using Cloudinary, you can ignore the `publicId` property.
 */
export interface Iimage {
  url: string;
  publicId?: string;
}
