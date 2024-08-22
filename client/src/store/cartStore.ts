import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem } from './types'

type CartState = {
	cart: CartItem[]
	isOpen: boolean
	setOpen: (isOpen: boolean) => void
	plusItem: (item: CartItem) => void
	minusItem: (item: CartItem) => void
	deleteItem: (item: CartItem) => void
}

export const useCartStore = create<CartState>()(
	persist(
		set => ({
			cart: [],
			isOpen: false,
			setOpen: isOpen => {
				set({ isOpen })
			},
			plusItem: item => {
				set(state => {
					const existItemIndex = state.cart.findIndex(el => el.id === item.id)
					if (existItemIndex !== -1) {
						const cart = [...state.cart]
						cart[existItemIndex].quantity += 1
						return { cart }
					} 
					return { cart: [...state.cart, item] }
				})
			},
			minusItem: item => {
				set(state => {
					if (item.quantity === 1) {
						const filteredItems = state.cart.filter(el => el.id !== item.id)
						return { cart: filteredItems }
					}
					const existItemIndex = state.cart.findIndex(el => el.id === item.id)
					if (existItemIndex !== -1) {
						const cart = [...state.cart]
						const quantity = cart[existItemIndex].quantity
						if (quantity === 1) {
						}
						cart[existItemIndex].quantity += -1
						return { cart }
					}
					return state
				})
			},
			deleteItem: item => {
				set(state => {
					const filteredItems = state.cart.filter(el => el.id !== item.id)
					return { cart: filteredItems }
				})
			},
		}),
		{
			name: 'cart',
			version: 1,
		}
	)
)
