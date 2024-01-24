import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
	email: string;
	nomeCompleto: string;
	cidadeId: number;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
	email: yup.string().required().email(),
	nomeCompleto: yup.string().required().min(3),
	cidadeId: yup.number().required(),
});

export const DetalheDePessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();

	const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
					formRef.current?.setData(result);
				}
			});
		} else {
			formRef.current?.setData({
				nomeCompleto: '',
				email: '',
				cidadeId: undefined,
			});
		}
	}, [id, navigate, formRef]);

	const handleSave = (dados: IFormData) => {
		formValidationSchema
			.validate(dados, { abortEarly: false })
			.then((dadosValidados) => {
				setIsLoading(true);

				if (id === 'nova') {
					PessoasService.create(dadosValidados).then((result) => {
						setIsLoading(false);
						if (result instanceof Error) {
							alert(result.message);
						} else {
							if (isSaveAndClose()) {
								navigate('/pessoas');
							} else {
								navigate(`/pessoas/detalhe/${result}`);
							}
						}
					});
				} else {
					PessoasService.updateById(Number(id), {
						id: Number(id),
						...dadosValidados,
					}).then((result) => {
						setIsLoading(false);
						if (result instanceof Error) {
							alert(result.message);
						} else {
							if (isSaveAndClose()) {
								navigate('/pessoas');
							}
						}
					});
				}
			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: IVFormErrors = {};
				errors.inner.forEach((error) => {
					if (!error.path) return;

					validationErrors[error.path] = error.message;
				});

				formRef.current?.setErrors(validationErrors);
			});
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
					aoClicarEmSalvar={save}
					aoClicarEmSalvarEFechar={saveAndClose}
					aoClicarEmApagar={() => handleDelete(Number(id))}
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					aoClicarEmVoltar={() => navigate('/pessoas')}
				/>
			}
		>
			<VForm ref={formRef} onSubmit={handleSave} placeholder={''}>
				<Box
					margin={1}
					display={'flex'}
					flexDirection={'column'}
					component={Paper}
					variant='outlined'
				>
					<Grid container direction={'column'} padding={2} spacing={2}>
						{isLoading && (
							<Grid item>
								<LinearProgress variant='indeterminate'></LinearProgress>
							</Grid>
						)}

						<Grid item>
							<Typography variant='h6'>Geral</Typography>
						</Grid>

						<Grid container item direction={'row'} spacing={2}>
							<Grid item xs={12} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Nome completo'
									name='nomeCompleto'
									disabled={isLoading}
									onChange={(e) => setNome(e.target.value)}
								/>
							</Grid>
						</Grid>

						<Grid container item direction={'row'} spacing={2}>
							<Grid item xs={12} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Email'
									name='email'
									disabled={isLoading}
								/>
							</Grid>
						</Grid>

						<Grid container item direction={'row'} spacing={2}>
							<Grid item xs={12} md={6} lg={4} xl={2}>
								<AutoCompleteCidade isExternalLoading={isLoading} />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</VForm>
		</LayoutBaseDePagina>
	);
};
