import { useEffect } from 'react'

import Menu from './pages/menu/menu'
import Cart from './pages/cart/cart'
import { useTelegram } from './hooks/useTelegram'
import { useCartStore } from './store/cartStore'

function App() {
  const { tg } = useTelegram()
  const { isOpen } = useCartStore()

  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [])

  if (isOpen) return <Cart />

  return <Menu />
}

export default App
