import { FC } from 'react'

import { useCartStore } from '../../store/cartStore'
import style from './cartIcon.module.css'

interface Props {
	quantity: number
}

const CartIcon: FC<Props> = ({ quantity }) => {
	
	const { setOpen } = useCartStore()

	const openCart = () => {
		setOpen(true)
	}

	return (
		<div className={style.container} onClick={openCart}>
			<svg
				role='img'
				className={style.icon}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 64 64'
			>
				<path
					fill='none'
					strokeWidth='2'
					strokeMiterlimit='10'
					d='M44 18h10v45H10V18h10z'
				></path>
				<path
					fill='none'
					strokeWidth='2'
					strokeMiterlimit='10'
					d='M22 24V11c0-5.523 4.477-10 10-10s10 4.477 10 10v13'
				></path>
			</svg>
			<div className={style.quantity}>
				{quantity}
			</div>
		</div>
	)
}

export default CartIcon
