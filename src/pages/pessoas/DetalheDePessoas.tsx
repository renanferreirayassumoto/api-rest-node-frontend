import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
	email: string;
	nomeCompleto: string;
	cidadeId: string;
}

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();

	const formRef = useRef<FormHandles>(null);

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
				}
			});
		}
	}, [id, navigate]);

	const handleSave = (dados: IFormData) => {
		console.log(dados);
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
					aoClicarEmSalvar={() => formRef.current?.submitForm()}
					aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
					aoClicarEmApagar={() => handleDelete(Number(id))}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>
			<Form ref={formRef} onSubmit={handleSave} placeholder={''}>
				<VTextField name='nomeCompleto' />
				<VTextField name='email' />
				<VTextField name='cidadeId' />
			</Form>
		</LayoutBaseDePagina>
	);
};
