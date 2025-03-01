import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserService from '../../api/Services/UserService'
import { AxiosError } from 'axios'

interface IInitialState {
	user: {
		accessToken: string
		email: string
		name: string
	}
	isError: boolean
	errorText: string
	isLoading: boolean
}

interface IAuthInfo {
	name: string
	email: string
	password: string
}

const initialState: IInitialState = {
	user: {
		accessToken: '',
		email: '',
		name: '',
	},
	errorText: '',
	isError: false,
	isLoading: false,
}

interface ILoginInfo {
	email: string
	password: string
}

export const registerUser = createAsyncThunk(
	'user/register',
	async (data: IAuthInfo, { rejectWithValue }) => {
		try {
			const response = await UserService.register(
				data.email,
				data.password,
				data.name
			)

			return response
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data)
			}
		}
	}
)

export const loginUser = createAsyncThunk(
	'user/login',
	async (data: ILoginInfo, { rejectWithValue }) => {
		try {
			const response = await UserService.login(data.email, data.password)
			return response
		} catch (error: AxiosError | unknown) {
			if (error instanceof AxiosError) {
				if (error.status === 400)
					return rejectWithValue('Email or password is incorrect')

				return rejectWithValue(error.response?.data)
			}
		}
	}
)

export const userSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {
		logout: (state) => {
			state.user.accessToken = ''
			state.user.email = ''
			state.user.name = ''
		},
	},
	extraReducers: (builder) => {
		// Start Register builders
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true
			state.errorText = ''
			state.isError = false
		})
		builder.addCase(registerUser.fulfilled, (state, action) => {
			if (action.payload) {
				state.user.accessToken = action.payload?.accessToken
				state.user.email = action.payload.user?.email
				state.user.name = action.payload.user?.name

				state.errorText = ''
				state.isError = false
				state.isLoading = false

				localStorage.setItem('token', action.payload?.accessToken)
				localStorage.setItem('name', action.payload.user?.name)
			}
		})
		builder.addCase(registerUser.rejected, (state, action) => {
			state.errorText = action.payload as string
			state.isError = true
			state.isLoading = false
		})
		// End Register builders

		// Start Login builders
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true
			state.isError = false
			state.errorText = ''
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			if (action.payload) {
				state.user.accessToken = action.payload?.accessToken
				state.user.email = action.payload.user?.email
				state.user.name = action.payload.user?.name

				state.isLoading = false
				state.isError = false
				state.errorText = ''

				localStorage.setItem('token', action.payload?.accessToken)
				localStorage.setItem('name', action.payload.user?.name)
			}
		})
		builder.addCase(loginUser.rejected, (state, action) => {
			state.errorText = action.payload as string
			state.isError = true
			state.isLoading = false
		})
		// End Login builders
	},
})

export const { logout } = userSlice.actions

export default userSlice.reducer
