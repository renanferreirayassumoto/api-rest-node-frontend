import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();

	const handleSave = () => {
		console.log('Save');
	};

	const handleDelete = () => {
		console.log('Delete');
	};

	return (
		<LayoutBaseDePagina
			titulo='Detalhe de pessoa'
			barraDeFerramentas={
				<FerramentasDeDetalhe
					textoBotaoNovo='Nova'
					mostrarBotaoSalvarEFechar
					mostrarBotaoApagar={id !== 'nova'}
					mostrarBotaoNovo={id !== 'nova'}
					aoClicarEmSalvar={handleSave}
					aoClicarEmSalvarEFechar={handleSave}
					aoClicarEmApagar={handleDelete}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>
			<p>DetalheDePessoas {id}</p>;
		</LayoutBaseDePagina>
	);
};
