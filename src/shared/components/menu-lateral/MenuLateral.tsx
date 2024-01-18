import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
	Icon,
	useMediaQuery,
} from '@mui/material';
import AvatarPhoto from './../../../img/avatar.jpg';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IMenuLateralProps {
	children: React.ReactNode;
}

interface IListItemLinkProps {
	to?: string;
	label: string;
	icon: string;
	onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({
	to = '',
	label,
	icon,
	onClick,
}) => {
	const navigate = useNavigate();

	const resolvedPath = useResolvedPath(to);
	const match = useMatch(resolvedPath.pathname);

	const handleClick = () => {
		if (to) {
			navigate(to);
		}
		onClick?.();
	};

	return (
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				<Icon>{icon}</Icon>
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	);
};

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
	const { toggleTheme, themeName } = useAppThemeContext();

	return (
		<>
			<Drawer
				open={isDrawerOpen}
				variant={smDown ? 'temporary' : 'permanent'}
				onClose={toggleDrawerOpen}
			>
				<Box
					width={theme.spacing(28)}
					height={'100%'}
					display={'flex'}
					flexDirection={'column'}
				>
					<Box
						width={'100%'}
						height={theme.spacing(20)}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Avatar
							src={AvatarPhoto}
							sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
						/>
					</Box>

					<Divider></Divider>
					<Box flex={1}>
						<List component='nav'>
							{drawerOptions.map((drawerOption) => (
								<ListItemLink
									key={drawerOption.path}
									icon={drawerOption.icon}
									label={drawerOption.label}
									to={drawerOption.path}
									onClick={smDown ? toggleDrawerOpen : undefined}
								/>
							))}
						</List>
					</Box>
					<Box>
						<List component='nav'>
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									<Icon>
										{themeName === 'dark' ? 'light_mode' : 'dark_mode'}
									</Icon>
								</ListItemIcon>
								<ListItemText primary='Alternar Tema' />
							</ListItemButton>
						</List>
					</Box>
				</Box>
			</Drawer>

			<Box height={'100vh'} marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};
