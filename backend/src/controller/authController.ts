import { Request, Response } from "express";
import { register, login, getUserById } from "../services/authServices";
import { registerDto, loginDto } from "../dto/authDto";

export const registerUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const data: registerDto = req.body;
        const user = await register(data);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const data: loginDto = req.body;
        const token = await login(data);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};