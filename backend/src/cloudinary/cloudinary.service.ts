import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import * as toStream from "buffer-to-stream";
import * as sharp from "sharp";

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    //resize image using sharp
    console.log("BUFFER", file);
    const bufferOfFile = await sharp(file.buffer)
      .resize(1870)
      .webp({ quality: 20 })
      .toBuffer();

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(bufferOfFile).pipe(upload);
    });
  }

  async deleteImage(resourceId: string) {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(resourceId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
