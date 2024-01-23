import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';

interface IDialogConfirmacaoProps {
	open: boolean;
	onClose: () => void;
	onClick: () => void;
	titulo: string;
	children: string;
}
export const DialogConfirmacao: React.FC<IDialogConfirmacaoProps> = ({
	onClick,
	onClose,
	open,
	titulo,
	children,
}) => {
	return (
		<Dialog open={open}>
			<DialogTitle>{titulo}</DialogTitle>
			<DialogContent>
				<Typography>{children}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClick}>Sim</Button>
				<Button onClick={onClose}>Não</Button>
			</DialogActions>
		</Dialog>
	);
};
