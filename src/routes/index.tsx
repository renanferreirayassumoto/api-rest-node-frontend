import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDePessoas } from '../pages';

export const AppRoutes = () => {
	const { setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				label: 'Página Inicial',
				icon: 'home',
				path: '/pagina-inicial',
			},
			{
				label: 'Pessoas',
				icon: 'person',
				path: '/pessoas',
			},
		]);
	}, [setDrawerOptions]);

	return (
		<Routes>
			<Route path='/pagina-inicial' element={<Dashboard />} />

			<Route path='/pessoas' element={<ListagemDePessoas />} />

			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};
