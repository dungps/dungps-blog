import React, {useEffect, Fragment} from "react"
import imgBg from "../../assets/img/img_parallax.jpeg"
import style from "./style.module.scss"

const Home = () => {
	useEffect(() => {
		document.body.style.overflow = "hidden"
	})

	return (
		<Fragment>
			<div className={style.bgImg}>
				<img className={style.img} src={imgBg} alt="home-img"/>
			</div>
			<div className={style.bgOverlay} />
		</Fragment>
	)
}

export default Home
