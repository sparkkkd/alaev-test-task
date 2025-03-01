import { FC } from 'react'
import clsx from 'clsx'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, TLoginSchema } from '../../models/AuthSchema'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUser } from '../../store/slices/userSlice'

import { FormInput } from '../../components/FormInput/FormInput'
import { Button, useToaster } from '@gravity-ui/uikit'

import styles from './LoginForm.module.sass'

interface LoginFormProps {
	className?: string
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
	const dispatch = useAppDispatch()
	const { errorText } = useAppSelector((state) => state.userSlice)
	const navigate = useNavigate()
	const { add } = useToaster()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (data: TLoginSchema) => {
		try {
			await dispatch(loginUser(data)).unwrap()
			navigate('/', { replace: true })
			add({
				name: 'loginSuccess',
				title: 'Success',
				content: 'You have successfully logged in',
			})
		} catch (error) {
			add({
				name: 'loginError',
				title: 'Error',
				content: errorText,
				autoHiding: 3000,
			})
		} finally {
			reset()
		}
	}

	return (
		<div className={clsx(className, styles.wrapper)}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					title='Email'
					register={register}
					registerName='email'
					errorText={errors.email?.message}
					isErorr={!!errors.email}
				/>
				<FormInput
					title='Password'
					register={register}
					registerName='password'
					errorText={errors.password?.message}
					isErorr={!!errors.password}
				/>
				<Button type='submit' className={styles.button} size='xl'>
					Login
				</Button>
			</form>
		</div>
	)
}
