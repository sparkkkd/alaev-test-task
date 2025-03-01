import { FC, useEffect, useState } from 'react'
import clsx from 'clsx'

import { AxiosError } from 'axios'
import UserService from '../../api/Services/UserService'

import styles from './Intro.module.sass'

interface IntroProps {
	className?: string
}

export const Intro: FC<IntroProps> = ({ className }) => {
	const [infoText, setInfoText] = useState<string>('')

	useEffect(() => {
		try {
			UserService.getInfo().then((res) => setInfoText(res))
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) {
				console.error(error)
			}
		}
	}, [])

	return (
		<div className={clsx(styles.wrapper, className)}>
			<h1 className={styles.title}>Welcome</h1>

			<p className={styles.about}>{infoText}</p>
		</div>
	)
}
