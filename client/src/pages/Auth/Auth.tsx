import clsx from 'clsx'
import { FC, useState } from 'react'

import styles from './Auth.module.sass'
import { RegisterForm } from '../../modules/RegisterForm/RegisterForm'
import { Button } from '@gravity-ui/uikit'
import { LoginForm } from '../../modules/LoginForm/LoginForm'

interface AuthProps {
	className?: string
}

export const Auth: FC<AuthProps> = ({ className }) => {
	const [type, setType] = useState<'register' | 'login'>('login')

	const changeType = (type: 'login' | 'register') => setType(type)

	return (
		<div className={clsx(className, styles.wrapper)}>
			<h2 className={styles.title}>
				{type === 'register' ? 'Register' : 'Login'}
			</h2>

			{type === 'register' && <RegisterForm />}
			{type === 'login' && <LoginForm />}

			{type === 'register' ? (
				<Button
					className={styles.button}
					view='outlined'
					onClick={() => changeType('login')}
				>
					Already have account? <span className={styles.accent}>Login!</span>
				</Button>
			) : (
				<Button
					className={styles.button}
					view='outlined'
					onClick={() => changeType('register')}
				>
					Still haven't account?{' '}
					<span className={styles.accent}>Register!</span>
				</Button>
			)}
		</div>
	)
}
