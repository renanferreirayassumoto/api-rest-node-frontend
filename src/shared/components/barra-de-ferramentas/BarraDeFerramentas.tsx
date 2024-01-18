import {
	Box,
	Button,
	Icon,
	InputAdornment,
	Paper,
	TextField,
	useTheme,
} from '@mui/material';

interface IBarraDeFerramentasProps {
	textoDaBusca?: string;
	mostrarInputBusca?: boolean;
	aoMudarTextoDeBusca?: (novoTexto: string) => void;
	textoBotaoNovo?: string;
	mostrarBotaoNovo?: boolean;
	aoClicarEmNovo?: () => void;
}
export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
	textoDaBusca = '',
	mostrarInputBusca = false,
	aoMudarTextoDeBusca,
	aoClicarEmNovo,
	textoBotaoNovo = 'Novo',
	mostrarBotaoNovo = true,
}) => {
	const theme = useTheme();

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
			{mostrarInputBusca && (
				<TextField
					size='small'
					value={textoDaBusca}
					onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
					placeholder='Pesquisar...'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<Icon>search</Icon>
							</InputAdornment>
						),
					}}
				/>
			)}

			<Box flex={1} display={'flex'} justifyContent={'end'}>
				{mostrarBotaoNovo && (
					<Button
						variant='contained'
						color='primary'
						disableElevation
						endIcon={<Icon>add</Icon>}
						onClick={aoClicarEmNovo}
					>
						{textoBotaoNovo}
					</Button>
				)}
			</Box>
		</Box>
	);
};
