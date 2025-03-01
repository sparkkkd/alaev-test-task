import { FC } from 'react'

import styles from './UserActionButtons.module.sass'
import clsx from 'clsx'
import { Button } from '@gravity-ui/uikit'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/slices/userSlice'
import { useIsAuth } from '../../hooks/useIsAuth'

interface UserActionButtonsProps {
	className?: string
}

export const UserActionButtons: FC<UserActionButtonsProps> = ({
	className,
}) => {
	const dispatch = useAppDispatch()
	const { isAuth, setIsAuth } = useIsAuth()

	const location = useLocation()
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('name')
		dispatch(logout())
		setIsAuth(false)
		navigate('/')
	}

	return (
		<div className={clsx(className, styles.buttons)}>
			<Link to={'/'}>
				<Button
					view={location.pathname === '/' ? 'action' : 'normal'}
					className={styles.button}
				>
					About us
				</Button>
			</Link>

			{!isAuth && location.pathname !== '/auth' && (
				<Link to={'/auth'}>
					<Button className={styles.button}>Sign in</Button>
				</Link>
			)}

			{isAuth && (
				<Button onClick={handleLogout} className={styles.button}>
					Sign out
				</Button>
			)}
			{isAuth && (
				<Link to={'/profile'}>
					<Button
						view={location.pathname === '/profile' ? 'action' : 'normal'}
						className={styles.button}
					>
						Profile
					</Button>
				</Link>
			)}
		</div>
	)
}
