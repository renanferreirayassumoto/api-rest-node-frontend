import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
	id: number;
	label: string;
};

interface IAutoCompleteCidadeProps {
	isExternalLoading?: boolean;
}
export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
	isExternalLoading = false,
}) => {
	const { fieldName, registerField, defaultValue, error, clearError } =
		useField('cidadeId');
	const { debounce } = useDebounce();

	const [isLoading, setIsLoading] = useState(false);
	const [busca, setBusca] = useState('');
	const [selectedId, setSelectedId] = useState<number | undefined>(
		defaultValue
	);

	const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => selectedId,
			setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
		});
	}, [registerField, fieldName, selectedId]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CidadesService.getAll(1, busca).then((result) => {
				setIsLoading(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setOpcoes(
						result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
					);
				}
			});
		});
	}, [debounce, busca]);

	const autoCompleteSelectedOption = useMemo(() => {
		if (!selectedId) return null;

		const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
		if (!selectedId) return null;

		return selectedOption;
	}, [selectedId, opcoes]);

	return (
		<Autocomplete
			openText='Abrir'
			closeText='Fechar'
			noOptionsText='Sem opções'
			loadingText='Carregando...'
			disablePortal
			disabled={isExternalLoading}
			value={autoCompleteSelectedOption}
			loading={isLoading}
			onChange={(_, newValue) => {
				setSelectedId(newValue?.id);
				setBusca('');
				clearError();
			}}
			popupIcon={
				isExternalLoading || isLoading ? (
					<CircularProgress size={28} />
				) : undefined
			}
			onInputChange={(_, newValue) => setBusca(newValue)}
			options={opcoes}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Cidade'
					error={!!error}
					helperText={error}
				/>
			)}
		/>
	);
};
