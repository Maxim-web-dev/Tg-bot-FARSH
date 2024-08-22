import style from './skeleton.module.css'

const Skeleton = () => {
	return (
		<div className={style.container}>
			<div className={style.img} />
			<div className={style.text}></div>
			<div className={style.text}></div>
			<div className={style.text}></div>
			<div className={style.text}></div>
			<div className={style.price}></div>
			<div className={style.button}></div>
		</div>
	)
}

export default Skeleton
