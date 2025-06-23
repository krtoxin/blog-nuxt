import { z } from "zod"

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, "Назва категорії обов'язкова")
    .min(3, "Назва повинна містити мінімум 3 символи")
    .max(255, "Назва не може перевищувати 255 символів")
    .trim(),

  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Псевдонім може містити тільки малі літери, цифри та дефіси")
    .optional()
    .or(z.literal("")),

  parent_id: z
    .number()
    .nullable()
    .optional(),

  description: z
    .string()
    .max(1000, "Опис не може перевищувати 1000 символів")
    .optional()
    .or(z.literal(""))
})
