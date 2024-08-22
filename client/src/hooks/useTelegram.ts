// @ts-ignore
const tg = window.Telegram.WebApp

export const useTelegram = () => {

	const closeApp = () => {
		tg.close()
	}

	return {
		tg, 
		closeApp,
		user: tg.initDataUnsafe?.user,
	}
}
