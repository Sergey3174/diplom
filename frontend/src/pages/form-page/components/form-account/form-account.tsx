import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectAccountsTypes, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import ADD_ICON from '../../../../assets/add-icon.svg';
import V_ICON from '../../../../assets/V.png';
import X_ICON from '../../../../assets/X.png';
import { addTypeAccountAsync, saveAccountAsync } from '../../../../actions';
import TRASH from '../../../../assets/trash.png';
import { ErrorPage } from '../../../error-page/error-page';
import { Dispatch } from 'redux';

interface FormAccountContainerProps {
	className?: string;
	onSave: (
		event: React.FormEvent | MouseEvent<HTMLImageElement>,
		action: any,
		method?: string,
		data?: any,
	) => void;
}

interface Account {
	id: string;
	name: string;
	type_accounts: string;
}

interface FormErrors {
	select?: string;
	name?: string;
}

const FormAccountContainer = ({ className, onSave }: FormAccountContainerProps) => {
	const [select, setSelect] = useState<string>('');
	const [nameAccount, setNameAccount] = useState<string>('');
	const [editing, setEditing] = useState<boolean>(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const typeAccounts = useSelector(selectAccountsTypes);
	const { accounts } = useSelector(selectAccounts);
	const isCreating = !!useMatch('/account');
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	const userId = useSelector(selectUserId);

	const { id: idAccount } = useParams<{ id: string }>();

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		if (!select) {
			newErrors.select = 'Тип категории обязателен';
		}
		if (!nameAccount) {
			newErrors.name = 'Имя категории обязательно';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	useEffect(() => {
		if (isCreating || accounts.length === 0) {
			return;
		} else {
			const account = accounts.find((acc: Account) => acc.id === idAccount);
			console.log(account);
			if (!account) {
				setErrorFetch('Такого счета не существует');
				return;
			}
			setSelect(account?.type_accounts || '');
			setNameAccount(account?.name || '');
		}
	}, [isCreating, accounts, idAccount]);

	const onNameChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
		setNameAccount(target.value);

	const handleSelectChange = (name: string, value: string) => setSelect(value);

	const [newTypeAccount, setNewTypeAccount] = useState<string>('');
	const onTypeChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
		setNewTypeAccount(target.value);

	const dispatch: Dispatch = useDispatch();

	const handleAddTypeAccount = () => {
		dispatch(addTypeAccountAsync(newTypeAccount)).then(() => setEditing(false));
	};

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (validateForm()) {
			const data = {
				userId,
				name: nameAccount,
				typeAccount: select,
			};

			isCreating
				? onSave(event, saveAccountAsync(data))
				: onSave(event, `/api/account/${idAccount}`, 'PATCH', data);
		}
	};

	if (errorFetch) {
		return <ErrorPage error={errorFetch} />;
	}

	return (
		<form className={className}>
			<h3>Добавить счет</h3>
			{/* Удаление счета при редактировании */}
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0"
					top="-5px"
					onClick={(event) => {
						onSave(event, `/api/account/${idAccount}`, 'DELETE');
					}}
				/>
			)}
			<div className="category-input">
				{/* Если не редактируем новый тип аккаунта */}
				{!editing ? (
					<>
						<Select
							label="Тип категории"
							name="select1"
							data={typeAccounts}
							value={select}
							onSelectChange={handleSelectChange}
						/>
						<IconButton
							onClick={() => setEditing(true)}
							icon={ADD_ICON}
							width="30px"
							position="absolute"
							right="-35px"
						/>
					</>
				) : (
					<>
						<div>Новая категория</div>
						<Input
							width="70%"
							onChange={onTypeChange}
							value={newTypeAccount}
							margin="10px 0"
						/>
						<div className="button-confirm-cancel">
							<IconButton
								icon={V_ICON}
								width="30px"
								onClick={handleAddTypeAccount}
							/>
							<IconButton
								icon={X_ICON}
								width="20px"
								onClick={() => setEditing(false)}
							/>
						</div>
					</>
				)}
			</div>
			{errors.select && <div style={{ color: 'red' }}>{errors.select}</div>}
			<div>Название счета</div>
			<Input
				width="100%"
				disabled={editing}
				onChange={onNameChange}
				value={nameAccount}
			/>
			{errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormAccount = styled(FormAccountContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;

	& .category-input {
		display: flex;
		align-items: center;
		position: relative;
		gap: 5px;
		justify-content: space-between;
	}

	& .button-confirm-cancel {
		display: flex;
		align-items: center;
		position: absolute;
		right: -50px;
	}
`;
