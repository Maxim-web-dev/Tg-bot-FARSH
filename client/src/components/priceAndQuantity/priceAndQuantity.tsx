import { FC } from 'react'

import { CartItem } from '../../store/types'
import { useCartStore } from '../../store/cartStore'
import style from './priceAndQuantity.module.css'

interface Props {
	price: number
	quantity: number
	item: CartItem
}

const PriceAndQuantity: FC<Props> = ({ price, quantity, item }) => {
	const { plusItem, minusItem } = useCartStore()

	const totalPrice = price * quantity

	const handlePlusItem = () => {
		plusItem(item)
	}

	const handleMinusItem = () => {
		minusItem(item)
	}
	return (
		<div className={style.container}>
			<div className={style.quantity}>
				<img
					className={style.img}
					onClick={handleMinusItem}
					src='https://static.tildacdn.com/lib/linea/c8eecd27-9482-6c4f-7896-3eb09f6a1091/arrows_circle_minus.svg'
					alt='-'
				/>
				<p className={style.quantityText}>{quantity}</p>
				<img
					onClick={handlePlusItem}
					className={style.img}
					src='https://static.tildacdn.com/lib/linea/c47d1e0c-6880-dc39-ae34-521197f7fba7/arrows_circle_plus.svg'
					alt='+'
				/>
			</div>
			<p className={style.price}>{totalPrice} р.</p>
		</div>
	)
}

export default PriceAndQuantity
