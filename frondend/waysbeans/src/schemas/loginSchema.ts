import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
});

export default loginSchema;
