import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

export type ProfileFormSchemaValues = z.infer<typeof profileSchema>;
