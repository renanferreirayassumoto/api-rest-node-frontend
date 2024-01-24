import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	TextField,
	Typography,
} from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useState } from 'react';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required().min(5),
});

interface ILoginProps {
	children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
	const { isAuthenticated, login } = useAuthContext();

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [emailError, setEmailError] = useState('');

	const handleSubmit = () => {
		setIsLoading(true);
		loginSchema
			.validate({ email, password }, { abortEarly: false })
			.then((dadosValidados) => {
				login(dadosValidados.email, dadosValidados.password).then(() => {
					setIsLoading(false);
				});
			})
			.catch((errors: yup.ValidationError) => {
				setIsLoading(false);
				errors.inner.forEach((error) => {
					if (error.path === 'email') {
						setEmailError(error.message);
					} else if (error.path === 'password') {
						setPasswordError(error.message);
					}
				});
			});
	};

	if (isAuthenticated) return <>{children}</>;

	return (
		<Box
			width={'100vw'}
			height={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Card>
				<CardContent>
					<Box display={'flex'} flexDirection={'column'} gap={2} width={250}>
						<Typography variant='h6' align='center'>
							Identifique-se
						</Typography>
						<TextField
							label='Email'
							fullWidth
							type='email'
							value={email}
							disabled={isLoading}
							error={!!emailError}
							helperText={emailError}
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={() => setEmailError('')}
						></TextField>
						<TextField
							label='Senha'
							type='password'
							fullWidth
							value={password}
							disabled={isLoading}
							error={!!passwordError}
							helperText={passwordError}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={() => setPasswordError('')}
						></TextField>
					</Box>
				</CardContent>
				<CardActions>
					<Box width={'100%'} display={'flex'} justifyContent={'center'}>
						<Button
							variant='contained'
							onClick={handleSubmit}
							disabled={isLoading}
							endIcon={
								isLoading ? (
									<CircularProgress
										size={20}
										variant='indeterminate'
										color='inherit'
									/>
								) : undefined
							}
						>
							Entrar
						</Button>
					</Box>
				</CardActions>
			</Card>
		</Box>
	);
};
