import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { LinearProgress } from '@mui/material';

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [nome, setNome] = useState('');

	useEffect(() => {
		if (id !== 'nova') {
			setIsLoading(true);
			PessoasService.getById(Number(id)).then((result) => {
				setIsLoading(false);
				if (result instanceof Error) {
					alert(result.message);
					navigate('/pessoas');
				} else {
					setNome(result.nomeCompleto);
					console.log(result);
				}
			});
		}
	}, [id, navigate]);

	const handleSave = () => {
		console.log('Save');
	};

	const handleDelete = (id: number) => {
		PessoasService.deleteById(id).then((result) => {
			if (result instanceof Error) {
				alert(result.message);
			} else {
				alert('Registro apagado com sucesso!');
				navigate('/pessoas');
			}
		});
	};

	return (
		<LayoutBaseDePagina
			titulo={id === 'nova' ? 'Nova pessoa' : nome}
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEFechar
					mostrarBotaoApagar={id !== 'nova'}
					mostrarBotaoNovo={id !== 'nova'}
					aoClicarEmSalvar={handleSave}
					aoClicarEmSalvarEFechar={handleSave}
					aoClicarEmApagar={() => handleDelete(Number(id))}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>
			{isLoading && <LinearProgress variant='indeterminate' />}
			<p>DetalheDePessoas {id}</p>
		</LayoutBaseDePagina>
	);
};
