import { FC } from 'react'

import styles from './Header.module.sass'
import clsx from 'clsx'
import { UserActionButtons } from '../../components/UserActionButtons/UserActionButtons'

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<div className={clsx(className, styles.header)}>
			<UserActionButtons />
		</div>
	)
}
