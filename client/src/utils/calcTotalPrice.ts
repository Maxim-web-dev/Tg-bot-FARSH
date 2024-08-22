import { CartItem } from '../store/types'

export const calcTotalPrice = (items: CartItem[]) => {
	return items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
}