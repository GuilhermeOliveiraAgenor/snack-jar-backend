import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  //table with variable
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env); //validate variable

if (!_env.success == true) {
  throw new Error("Error in variables");
}

export const env = _env.data;
