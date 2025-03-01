import clsx from 'clsx'
import { FC } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, TRegisterSchema } from '../../models/AuthSchema'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { registerUser } from '../../store/slices/userSlice'

import { FormInput } from '../../components/FormInput/FormInput'
import { Button, useToaster } from '@gravity-ui/uikit'

import styles from './RegisterForm.module.sass'

interface AuthFormProps {
	className?: string
}

export const RegisterForm: FC<AuthFormProps> = ({ className }) => {
	const dispatch = useAppDispatch()
	const { errorText } = useAppSelector((state) => state.userSlice)
	const navigate = useNavigate()
	const { add } = useToaster()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TRegisterSchema>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: TRegisterSchema) => {
		try {
			await dispatch(registerUser(data)).unwrap()
			navigate('/', { replace: true })
			add({
				name: 'registerSuccess',
				title: 'Success',
				content: 'Your account has been created',
				autoHiding: 3000,
			})
		} catch (error) {
			add({
				name: 'registerError',
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
					title='Name'
					register={register}
					registerName='name'
					errorText={errors.name?.message}
					isErorr={!!errors.name}
				/>
				<FormInput
					title='Password'
					register={register}
					registerName='password'
					errorText={errors.password?.message}
					isErorr={!!errors.password}
				/>
				<Button type='submit' className={styles.button} size='xl'>
					Register
				</Button>
			</form>
		</div>
	)
}
