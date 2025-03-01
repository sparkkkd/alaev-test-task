export interface IGetInfo {
	message: string
}

export interface IAuthModel {
	accessToken: string
	user: IUserInfo
}

interface IUserInfo {
	email: string
	name: string
}

export interface IQuote {
	quote: string
	author: string
}
