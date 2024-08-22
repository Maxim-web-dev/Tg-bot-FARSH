import axios from 'axios'
import { useEffect, useState } from 'react'

import CartIcon from '../../components/cartIcon/cartIcon'
import { getQuantityOfItems } from '../../utils/getQuantityOfItems'
import { CartItem } from '../../store/types'
import Skeleton from '../../components/skeletons/skeleton'
import { useCartStore } from '../../store/cartStore'
import style from './menu.module.css'

type Item = Omit<CartItem, 'quantity'>

const Menu = () => {
	const [items, setItems] = useState<Item[]>([])
	const [isLoading, setLoading] = useState(true)
	const { cart, plusItem } = useCartStore()
	const quantity = getQuantityOfItems(cart)

	const handleAddToCart = (item: Item) => {
		plusItem({ ...item, quantity: 1 })
	}

	useEffect(() => {
		axios
			.get('https://66acba11f009b9d5c73331c6.mockapi.io/burgers')
			.then(res => setItems(res.data))
			.then(_ => setLoading(false))
			.catch(err => console.log(err))
	}, [])
	return (
		<div className={style.container}>
			<div className={style.header}>
				<img
					src='https://static.tildacdn.com/tild3432-3534-4366-b439-646361636536/logo_1.svg'
					className={style.headerLogo}
					alt='#FARШ'
				/>
			</div>
			{quantity > 0 && <CartIcon quantity={quantity} />}
			<div className={style.logo}>
				<img
					src='https://static.tildacdn.com/tild6538-3939-4866-a239-303436613730/photo.svg'
					className={style.logoImg}
				/>
				<h1 className={style.logoText}>БУРГЕРЫ</h1>
			</div>
			{isLoading
				? new Array(10).fill(null).map((_, i) => <Skeleton key={i} />)
				: items?.map((item: Item) => (
						<div key={item.id} className={style.item}>
							<img
								src={item.imageUrl}
								alt={item.name}
								className={style.image}
							/>
							<h1>{item.name}</h1>
							<p className={style.text}>{item.description}</p>
							<p className={style.price}>{item.price} p.</p>
							<button
								className={style.button}
								onClick={() => handleAddToCart(item)}
							>
								Заказать
							</button>
						</div>
				  ))}
		</div>
	)
}

export default Menu
