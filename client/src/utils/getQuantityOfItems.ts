import { CartItem } from '../store/types'

export const getQuantityOfItems = (items: CartItem[]) => {
	return items?.reduce((sum, item) => sum + item.quantity, 0)
}