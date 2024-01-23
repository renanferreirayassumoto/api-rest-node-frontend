import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import {
	Dashboard,
	DetalheDePessoas,
	ListagemDePessoas,
	ListagemDeCidades,
	DetalheDeCidades,
} from '../pages';

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
				label: 'Cidades',
				icon: 'location_city',
				path: '/cidades',
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
			<Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />

			<Route path='/cidades' element={<ListagemDeCidades />} />
			<Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} />

			<Route path='*' element={<Navigate to='/pagina-inicial' />} />
		</Routes>
	);
};
