import { useNavigate, useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import {
	IDetalhePessoa,
	PessoasService,
} from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import {
	Icon,
	IconButton,
	LinearProgress,
	Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
} from '@mui/material';
import { Environment } from '../../shared/environment';
import { DialogConfirmacao } from './components/DialogConfirmacao';

export const ListagemDePessoas: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { debounce } = useDebounce();
	const navigate = useNavigate();

	const [rows, setRows] = useState<IDetalhePessoa[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = (id: number) => {
		setDeleteId(id);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setDeleteId(null);
		setOpenDialog(false);
	};

	const busca = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	const pagina = useMemo(() => {
		return Number(searchParams.get('pagina') || '1');
	}, [searchParams]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			PessoasService.getAll(pagina, busca).then((result) => {
				setIsLoading(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setRows(result.data);
					setTotalCount(result.totalCount);
				}
			});
		});
	}, [busca, pagina, debounce]);

	const handleDelete = () => {
		PessoasService.deleteById(Number(deleteId)).then((result) => {
			if (result instanceof Error) {
				alert(result.message);
			} else {
				setRows((oldRows) => [
					...oldRows.filter((oldRow) => oldRow.id !== Number(deleteId)),
				]);
				setOpenDialog(false);
				PessoasService.getAll(pagina, busca).then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
					} else {
						setRows(result.data);
						setTotalCount(result.totalCount);
					}
				});
			}
		});
	};

	return (
		<LayoutBaseDePagina
			titulo='Listagem de pessoas'
			barraDeFerramentas={
				<FerramentasDaListagem
					textoBotaoNovo='Nova'
					aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
					mostrarInputBusca
					textoDaBusca={busca}
					aoMudarTextoDeBusca={(texto) =>
						setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
					}
				/>
			}
		>
			<TableContainer
				component={Paper}
				variant='outlined'
				sx={{ m: 1, width: 'auto' }}
			>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Ações</TableCell>
							<TableCell>Nome completo</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.id}>
								<TableCell>
									<IconButton
										size='small'
										onClick={() => handleOpenDialog(row.id)}
									>
										<Icon>delete</Icon>
									</IconButton>
									<IconButton
										size='small'
										onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}
									>
										<Icon>edit</Icon>
									</IconButton>
								</TableCell>
								<TableCell>{row.nomeCompleto}</TableCell>
								<TableCell>{row.email}</TableCell>
							</TableRow>
						))}
					</TableBody>

					{totalCount === 0 && !isLoading && (
						<caption>{Environment.LISTAGEM_VAZIA}</caption>
					)}

					<TableFooter>
						{isLoading && (
							<TableRow>
								<TableCell colSpan={3}>
									<LinearProgress variant='indeterminate' />
								</TableCell>
							</TableRow>
						)}
						{totalCount > Environment.LIMITE_DE_LINHAS && (
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination
										page={pagina}
										count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
										onChange={(_, newPage) =>
											setSearchParams(
												{ busca, pagina: newPage.toString() },
												{ replace: true }
											)
										}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableFooter>
				</Table>
			</TableContainer>

			<DialogConfirmacao
				open={openDialog}
				onClose={handleCloseDialog}
				onClick={handleDelete}
				titulo='Apagar registro'
			>
				Tem certeza que deseja apagar o registro?
			</DialogConfirmacao>
		</LayoutBaseDePagina>
	);
};
