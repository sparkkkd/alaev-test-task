import { z } from 'zod'

export const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
})

export const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
})

export type TRegisterSchema = z.infer<typeof registerSchema>
export type TLoginSchema = z.infer<typeof loginSchema>
