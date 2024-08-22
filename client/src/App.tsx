import { useEffect } from 'react'

import { useTelegram } from './hooks/useTelegram'
import { useCartStore } from './store/cartStore'

function App() {
  const { tg } = useTelegram()
  const { isOpen } = useCartStore()

  useEffect(() => {
    tg.ready()
    tg.expand()
  }, [])

  // if (isOpen) return <Cart />

  // return <Menu />
}

export default App
