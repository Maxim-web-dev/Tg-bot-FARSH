import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	email: z.string().email({ message: 'Некорректная почта' }),
	phone: z.string().min(10, { message: 'Поле обязательно для заполнения' }),
	city: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	street: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	house: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	building: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	apartment: z.string().min(1, { message: 'Поле обязательно для заполнения' }),
	comment: z.string().optional(),
})

export type TypeFormSchema = z.infer<typeof formSchema>