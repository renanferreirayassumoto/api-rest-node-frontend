import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
	const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();
	const { toggleTheme } = useAppThemeContext();

	useEffect(() => {
		setDrawerOptions([
			{
				label: 'Página Inicial',
				icon: 'home',
				path: '/pagina-inicial',
			},
			{
				label: 'Alterar Tema',
				icon: 'dark_mode',
				onClick: () => {
					console.log('Toggle Theme Clicked');
					toggleTheme();
				},
			},
		]);
	}, [setDrawerOptions, toggleTheme]);

	return (
		<Routes>
			<Route
				path='/pagina-inicial'
				element={
					<Button
						variant='contained'
						color='primary'
						onClick={toggleDrawerOpen}
					>
						Toggle Drawer
					</Button>
				}
			/>
			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};
