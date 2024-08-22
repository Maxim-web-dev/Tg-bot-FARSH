import { useEffect } from 'react'

import Form from '../../components/deliveryForm/form'
import PriceAndQuantity from '../../components/priceAndQuantity/priceAndQuantity'
import { CartItem } from '../../store/types'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import style from './cart.module.css'
import { useCartStore } from '../../store/cartStore'

const Cart = () => {
	const { cart, deleteItem, setOpen } = useCartStore()

	const totalPrice = calcTotalPrice(cart)

	const closeCart = () => {
		setOpen(false)
	}
	useEffect(() => {
		if (cart.length === 0) {
			setOpen(false)
		}
	}, [cart])
	return (
		<div>
			<div className={style.header} onClick={closeCart}>
				<svg
					className={style.closeBtn}
					role='presentation'
					width='16px'
					height='16px'
					viewBox='0 0 23 23'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g stroke='none' strokeWidth='1' fill='#fff' fillRule='evenodd'>
						<rect
							transform='translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) '
							x='10.3137085'
							y='-3.6862915'
							width='2'
							height='30'
						></rect>
						<rect
							transform='translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) '
							x='10.3137085'
							y='-3.6862915'
							width='2'
							height='30'
						></rect>
					</g>
				</svg>
			</div>
			<div className={style.container}>
				<div className={style.titleDiv}>
					<h1 className={style.titleText}>Оплата только картой на сайте</h1>
				</div>
				<div className={style.order}>
					{cart?.map((item: CartItem, i) => (
						<div className={style.item} key={i}>
							<div
								className={style.imageContainer}
								style={{ backgroundImage: `url(${item.imageUrl})` }}
							/>
							<div className={style.itemBody}>
								<div className={style.itemHeader}>
									<h3 className={style.itemName}>{item.name}</h3>
									<img
										onClick={() => deleteItem(item)}
										className={style.deleteBtn}
										src='https://static.tildacdn.com/lib/linea/1bec3cd7-e9d1-2879-5880-19b597ef9f1a/arrows_circle_remove.svg'
										alt='Delete'
									/>
								</div>
								<PriceAndQuantity
									price={item.price}
									quantity={item.quantity}
									item={item}
								/>
							</div>
						</div>
					))}
				</div>
				<div className={style.totalPrice}>Сумма: {totalPrice} р.</div>
				<Form />
			</div>
		</div>
	)
}

export default Cart
