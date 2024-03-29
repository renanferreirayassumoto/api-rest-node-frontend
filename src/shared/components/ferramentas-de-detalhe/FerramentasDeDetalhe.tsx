import {
	Box,
	Button,
	Divider,
	Icon,
	Paper,
	Skeleton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

interface IFerramentasDeDetalheProps {
	textoBotaoNovo?: string;

	mostrarBotaoNovo?: boolean;
	mostrarBotaoVoltar?: boolean;
	mostrarBotaoApagar?: boolean;
	mostrarBotaoSalvar?: boolean;
	mostrarBotaoSalvarEFechar?: boolean;

	mostrarBotaoNovoCarregando?: boolean;
	mostrarBotaoVoltarCarregando?: boolean;
	mostrarBotaoApagarCarregando?: boolean;
	mostrarBotaoSalvarCarregando?: boolean;
	mostrarBotaoSalvarEFecharCarregando?: boolean;

	aoClicarEmNovo?: () => void;
	aoClicarEmVoltar?: () => void;
	aoClicarEmApagar?: () => void;
	aoClicarEmSalvar?: () => void;
	aoClicarEmSalvarEFechar?: () => void;
}
export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
	textoBotaoNovo = 'Novo',

	mostrarBotaoNovo = true,
	mostrarBotaoVoltar = true,
	mostrarBotaoApagar = true,
	mostrarBotaoSalvar = true,
	mostrarBotaoSalvarEFechar = false,

	aoClicarEmNovo,
	aoClicarEmVoltar,
	aoClicarEmApagar,
	aoClicarEmSalvar,
	aoClicarEmSalvarEFechar,

	mostrarBotaoNovoCarregando = false,
	mostrarBotaoVoltarCarregando = false,
	mostrarBotaoApagarCarregando = false,
	mostrarBotaoSalvarCarregando = false,
	mostrarBotaoSalvarEFecharCarregando = false,
}) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box
			height={theme.spacing(5)}
			marginX={1}
			padding={1}
			paddingX={2}
			display={'flex'}
			gap={1}
			alignItems={'center'}
			component={Paper}
		>
			{mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
				<Button
					variant='contained'
					color='primary'
					disableElevation
					onClick={aoClicarEmSalvar}
					startIcon={<Icon>save</Icon>}
				>
					<Typography variant='button' noWrap>
						Salvar
					</Typography>
				</Button>
			)}

			{mostrarBotaoSalvarCarregando && !smDown && !mdDown && (
				<Skeleton width={108} height={60} />
			)}

			{mostrarBotaoSalvarEFechar &&
				!mostrarBotaoSalvarEFecharCarregando &&
				!smDown &&
				!mdDown && (
					<Button
						variant='outlined'
						color='primary'
						disableElevation
						onClick={aoClicarEmSalvarEFechar}
						startIcon={<Icon>save</Icon>}
					>
						<Typography variant='button' noWrap>
							Salvar e fechar
						</Typography>
					</Button>
				)}

			{mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown && (
				<Skeleton width={177} height={60} />
			)}

			{mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmApagar}
					startIcon={<Icon>delete</Icon>}
				>
					<Typography variant='button' noWrap>
						Apagar
					</Typography>
				</Button>
			)}

			{mostrarBotaoApagarCarregando && !smDown && !mdDown && (
				<Skeleton width={112} height={60} />
			)}

			{mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmNovo}
					startIcon={<Icon>add</Icon>}
				>
					<Typography variant='button' noWrap>
						{textoBotaoNovo}
					</Typography>
				</Button>
			)}

			{mostrarBotaoNovoCarregando && !smDown && !mdDown && (
				<Skeleton width={95} height={60} />
			)}

			{mostrarBotaoVoltar &&
				(mostrarBotaoNovo ||
					mostrarBotaoApagar ||
					mostrarBotaoSalvar ||
					mostrarBotaoSalvarEFechar) && (
					<Divider variant='middle' orientation='vertical' />
				)}

			{mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
				<Button
					variant='outlined'
					color='primary'
					disableElevation
					onClick={aoClicarEmVoltar}
					startIcon={<Icon>arrow_back</Icon>}
				>
					<Typography variant='button' noWrap>
						Voltar
					</Typography>
				</Button>
			)}

			{mostrarBotaoVoltarCarregando && !smDown && !mdDown && (
				<Skeleton width={108} height={60} />
			)}
		</Box>
	);
};
