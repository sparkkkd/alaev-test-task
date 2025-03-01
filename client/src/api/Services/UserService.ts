import $api from '../http'
import { IAuthModel, IGetInfo } from '../../models/UserModels'

export default class UserService {
	static async login(email: string, password: string) {
		const response = await $api.post<IAuthModel>('/login', {
			email,
			password,
		})

		if (response.status === 200) {
			return response.data
		}
	}

	static async register(email: string, password: string, name: string) {
		const response = await $api.post<IAuthModel>('/register', {
			email,
			password,
			name,
		})

		if (response.status === 201) {
			return response.data
		}
	}

	static async getInfo() {
		const response = await $api.get<IGetInfo>('/info')
		return response.data.message
	}

	static async checkAuth(token: string) {
		try {
			const response = await $api.post(
				'/checkAuth',
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			if (response.status === 201) {
				return true
			} else {
				return false
			}
		} catch (error) {}
	}
}
