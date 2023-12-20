import { z } from 'zod'

export const loginSchema = z.object({
  password: z.string(),
})

export const addEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  grouped: z.boolean().optional(),
})

export const updateEventSchema = z.object({
  status: z.boolean().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  grouped: z.boolean().optional(),
})

export const addGroupSchema = z.object({
  name: z.string(),
})

export const updateGroupSchema = z.object({
  name: z.string(),
})

export const addPersonSchema = z.object({
  name: z.string(),
  cpf: z.string().transform((value) => value.replaceAll('/.|-/gm', '')),
})

export const updatePersonSchema = z.object({
  name: z.string().optional(),
  cpf: z
    .string()
    .transform((value) => value.replaceAll('/.|-/gm', ''))
    .optional(),
  matched: z.string().optional(),
})

export const searchPersonSchema = z.object({
  cpf: z.string().transform((value) => value.replaceAll('/.|-/gm', '')),
})
