import { prisma } from "../libs/prisma";
import { profileDto } from "../dto/profileDto";
import UploadImageToCloudinary from "../libs/cloudinary";

export const getProfile = async (userId: number) => {
    const profile = await prisma.profile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    email: true,
                    fullname: true,
                }
            }
        }
    });
    if (!profile) {
        throw new Error("Profile not found");
    }
    return profile;
};

export const UpdateProfiles = async (
    userId: number,
    profileData: profileDto,
    imageBuffer?: Buffer
  ) => {
    let imageUrl: string | null = null;
  
    if (imageBuffer) {
      try {
        const imageResult = await UploadImageToCloudinary(imageBuffer);
        if (!imageResult) {
          throw new Error("Failed to upload image");
        }
        imageUrl = imageResult.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Failed to upload image to Cloudinary");
      }
    }
  
    try {
      const existingProfile = await prisma.profile.findUnique({
        where: { userId },
      });
  
      if (!existingProfile) {
        const newProfile = await prisma.profile.create({
          data: {
            image: (imageUrl) as string,
            user: {
              connect: { id: userId },
            },
          },
        });
        return newProfile;
      }
  
      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          image: (imageUrl ?? profileData.image) as string,
          user: {
            update: {
              email: profileData.email,
              fullname: profileData.fullname,
            },
          },
        },
        include: {
          user: {
            select: {
              email: true,
              fullname: true,
            },
          },
        },
      });
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile in database:", error);
      throw new Error("Failed to update profile data");
    }
  };


