import { Request, Response } from "express";
import { getProfile,UpdateProfiles } from "../services/profileServices";
import { profileDto } from "../dto/profileDto";

export const getProfileController = async (req: Request, res: Response) => {
    const userId= parseInt(req.params.userId);
    try {
        const profile = await getProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfileController = async (req: Request, res: Response) => {
    const userId= parseInt(req.params.userId);
    const profileData: profileDto = req.body;
    const imageBuffer = req.file?.buffer;
    try {
        const updatedProfile = await UpdateProfiles(userId, profileData, imageBuffer);
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}