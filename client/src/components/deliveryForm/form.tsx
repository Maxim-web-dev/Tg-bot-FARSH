import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { TypeFormSchema, formSchema } from './schema/inputsSchema'
import { useTelegram } from '../../hooks/useTelegram'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { useCartStore } from '../../store/cartStore'
import style from './form.module.css'

const Form: FC = () => {
	const { tg } = useTelegram()
	const { cart } = useCartStore()
	const totalPrice = calcTotalPrice(cart)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TypeFormSchema>({
		mode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: 'alex',
			email: 'a@a.ru',
			phone: '8-800-555-35-35',
			city: 'Москва',
			street: 'Льва Толстого',
			building: '15',
			house: '15',
			apartment: '15',
			comment: 'Комментарий',
		},
	})

	const onSubmit: SubmitHandler<TypeFormSchema> = formData => {
		const data = {
			...formData,
			cart,
			telegramId: tg.initDataUnsafe?.user?.id,
			totalPrice: totalPrice + 299
		}
		tg.sendData(JSON.stringify(data))
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<div>
				<input
					placeholder='Ваше имя'
					{...register('name', { required: true })}
				/>
				{errors?.name && (
					<span className={style.error}>{errors?.name?.message}</span>
				)}
			</div>
			<div>
				<input
					placeholder='E-mail'
					{...register('email', { required: true })}
				/>
				{errors?.email && (
					<span className={style.error}>{errors?.email?.message}</span>
				)}
			</div>
			<div>
				<input
					placeholder='Ваш телефон'
					{...register('phone', { required: true })}
				/>
				{errors?.phone && (
					<span className={style.error}>{errors?.phone?.message}</span>
				)}
			</div>
			<div>
				<input placeholder='Город' {...register('city', { required: true })} />
				{errors?.city && (
					<span className={style.error}>{errors?.city?.message}</span>
				)}
			</div>
			<div>
				<input
					placeholder='Улица'
					{...register('street', { required: true })}
				/>
				{errors?.street && (
					<span className={style.error}>{errors?.street?.message}</span>
				)}
			</div>
			<div>
				<input placeholder='Дом' {...register('house', { required: true })} />
				{errors?.house && (
					<span className={style.error}>{errors?.house?.message}</span>
				)}
			</div>
			<div>
				<input
					placeholder='Корпус'
					{...register('building', { required: true })}
				/>
				{errors?.building && (
					<span className={style.error}>{errors?.building?.message}</span>
				)}
			</div>
			<div>
				<input
					placeholder='Квартира'
					{...register('apartment', { required: true })}
				/>
				{errors?.apartment && (
					<span className={style.error}>{errors?.apartment?.message}</span>
				)}
			</div>
			<input placeholder='Комментарий' {...register('comment')} />
			<div className={style.cartTotal}>
				<p className={style.totalText}>Сумма: {totalPrice} р.</p>
				<p className={style.totalText}>Доставка курьером: 299 р.</p>
				<p className={style.totalStrong}>
					Итоговая сумма: {totalPrice + 299} р.
				</p>
			</div>
			<button type='submit' className={style.button}>
				Оформить заказ
			</button>
		</form>
	)
}

export default Form
