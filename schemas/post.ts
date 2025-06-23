import { z } from "zod"

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок повинен містити мінімум 3 символи")
    .max(255, "Заголовок не може перевищувати 255 символів")
    .trim(),

  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Псевдонім може містити тільки малі літери, цифри та дефіси")
    .optional()
    .or(z.literal("")),

  category_id: z
    .number({
      required_error: "Оберіть категорію",
      invalid_type_error: "Оберіть категорію",
    })
    .min(1, "Оберіть категорію"),

  excerpt: z.string().max(500, "Короткий опис не може перевищувати 500 символів").optional().or(z.literal("")),

  content_raw: z.string().min(10, "Контент повинен містити мінімум 10 символів").trim(),

  is_published: z.boolean().default(false),

  published_at: z.string().nullable().optional(),
})