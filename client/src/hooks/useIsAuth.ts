import { useEffect, useState } from 'react'
import UserService from '../api/Services/UserService'
import { useAppSelector } from '../store/hooks'

export const useIsAuth = () => {
	const { accessToken } = useAppSelector((state) => state.userSlice.user)
	const token = localStorage.getItem('token') || accessToken

	const [isAuth, setIsAuth] = useState<boolean>(false)

	useEffect(() => {
		const checkAuth = async () => {
			if (await UserService.checkAuth(token)) {
				setIsAuth(true)
			} else {
				setIsAuth(false)
			}
		}

		checkAuth()
	}, [token])

	return { isAuth, setIsAuth }
}
