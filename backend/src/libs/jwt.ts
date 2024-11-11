import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your secret key";

export const genereateToken = (userId: number, role: string,email:string) => {
  return jwt.sign({ userId, role,email }, secretKey, { expiresIn: "1h" });
};

export const verifyToken = ( token: string)=> {
    return jwt.verify(token,secretKey)
}
