import { FC, useRef, useState } from 'react'
import clsx from 'clsx'

import { useAppSelector } from '../../store/hooks'

import { Button } from '@gravity-ui/uikit'
import { Modal } from '@gravity-ui/uikit'
import { Spin } from '@gravity-ui/uikit'

import avatarImg from '../../images/avatar.png'

import styles from './Profile.module.sass'
import axios, { AxiosError } from 'axios'
import { IQuote } from '../../models/UserModels'

interface ProfileProps {
	className?: string
}

export const Profile: FC<ProfileProps> = ({ className }) => {
	const [open, setOpen] = useState<boolean>(false)

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [qoute, setQoute] = useState<string>('')
	const [author, setAuthor] = useState<string>('')

	const controller = useRef<AbortController>(new AbortController())

	const { name } = useAppSelector((state) => state.userSlice.user)

	const handleCancelRequest = () => {
		setIsLoading(false)
		controller.current.abort()
		setOpen(false)
	}

	const handleUpdateRequest = async () => {
		controller.current = new AbortController()

		setIsLoading(true)
		setOpen(true)

		try {
			setTimeout(async () => {
				const response = await axios.get<IQuote[]>(
					'https://api.api-ninjas.com/v1/quotes',
					{
						headers: {
							'X-Api-Key': 'Zhua2p7EK+yMxOiInSRp6Q==04lsXHbDKvmHe5kZ',
						},
						signal: controller.current.signal,
					}
				)

				setQoute(response.data[0].quote)
				setAuthor(response.data[0].author)
				setIsLoading(false)
				setOpen(false)
			}, 3000)
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) {
				console.error(error)
			}
		}
	}

	return (
		<div className={clsx(className, styles.wrapper)}>
			<div className={styles.userInfo}>
				<div className={styles.avatar}>
					<img src={avatarImg} alt='avatar' />
				</div>
				<div className={styles.greetings}>
					Welcome, {name || localStorage.getItem('name')}
					<Button onClick={handleUpdateRequest} size='xl'>
						Update
					</Button>
				</div>
			</div>

			{author && (
				<p className={styles.subtext}>
					<span className={styles.author}>{author}</span> -{' '}
					<span>{qoute} ©</span>
				</p>
			)}

			<Modal open={open} onOpenChange={setOpen}>
				<div className={styles.modal}>
					<h3 className={styles.modalTitle}>Requesting the quote</h3>

					<div className={styles.modalContent}>
						<span>
							Step 1 - Requesting author...
							{isLoading && <Spin className={styles.spinner} size='xs' />}
						</span>
						<span>
							Step 2 - Requesting quote...
							{isLoading && <Spin className={styles.spinner} size='xs' />}
						</span>
					</div>

					<Button onClick={handleCancelRequest} size='m'>
						Cancel
					</Button>
				</div>
			</Modal>
		</div>
	)
}
