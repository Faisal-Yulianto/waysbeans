import { z } from 'zod';

const registerSchema = z.object({
  fullname: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default registerSchema;