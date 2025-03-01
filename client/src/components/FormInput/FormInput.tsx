import clsx from 'clsx'
import { TextInput } from '@gravity-ui/uikit'
import { FieldValues, UseFormRegister, Path } from 'react-hook-form'

import styles from './FormInput.module.sass'

type FormInputProps<T extends FieldValues> = {
	registerName: Path<T>
	register: UseFormRegister<T>
	className?: string
	title: string
	isErorr?: boolean
	errorText?: string
}

export const FormInput = <T extends FieldValues>({
	register,
	registerName,
	className,
	title,
	isErorr,
	errorText,
}: FormInputProps<T>) => {
	return (
		<div className={clsx(styles.wrapper, className)}>
			<div className={styles.title}>{title}</div>
			<TextInput
				className={styles.input}
				size='l'
				type='text'
				{...register(registerName)}
			/>

			{isErorr && <div className={styles.error}>{errorText}</div>}
		</div>
	)
}
