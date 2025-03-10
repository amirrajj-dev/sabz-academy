import { z } from "zod";

export const schema = z.object({
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
    .max(20, "رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد.")
    .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد.")
    .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد.")
    .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد.")
    .regex(/[^a-zA-Z0-9]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد."),
});

export type resetPasswordSchemaType = z.infer<typeof schema>