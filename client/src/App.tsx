import { Toaster, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Header } from './modules/Header/Header'
import { Intro } from './pages/Intro/Intro'
import { Auth } from './pages/Auth/Auth'
import { Profile } from './pages/Profile/Profile'

import styles from './App.module.sass'

function App() {
	const location = useLocation()
	const toaster = new Toaster()

	return (
		<div className={styles.wrapper}>
			<Header />
			<ToasterProvider toaster={toaster}>
				<Routes location={location} key={location.pathname}>
					<Route path='/' element={<Intro />} index />
					<Route path='/auth' element={<Auth />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
				<ToasterComponent />
			</ToasterProvider>
		</div>
	)
}

export default App
