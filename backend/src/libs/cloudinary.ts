import { UploadApiResponse, v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (fileBuffer: Buffer): Promise<UploadApiResponse | undefined> => {
  console.log("Uploading image to Cloudinary...",Error );
  return new Promise((resolve, reject) => {
    cloudinaryV2.uploader.upload_stream({ folder: 'waysbeans' }, (error, result) => {
      if (error) {
        reject(error);  
      } else if (result) {
        console.log("Cloudinary upload successful:", result)
        resolve(result);  
      } else {
        resolve(undefined); 
      }
    }).end(fileBuffer);
  });
};

export default uploadImageToCloudinary;
