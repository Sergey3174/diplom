import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectUserId } from '../../../../selectors';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useSelectValues } from '../../../../hooks';
import TRASH from '../../../../assets/trash.png';
import ADD_ICON from '../../../../assets/add-icon.svg';
import {
	CLOSE_MODAL,
	openModal,
	removeTransactionAsync,
	saveTransactionAsync,
	updateTransactionAsync,
} from '../../../../actions';
import { ErrorPage } from '../../../error-page/error-page';

interface SelectValues {
	select1: string;
	select2: string;
	select3: string;
}

interface FormTransactionProps {
	className?: string;
	onSave: (event: React.FormEvent, data: any) => void;
}

interface Errors {
	amount?: string;
	description?: string;
	type?: string;
	category?: string;
	account?: string;
}

interface TransactionData {
	userId: string;
	accountId: string | number;
	categoryId: string | number;
	amount: number;
	type: string | number;
	description: string;
}

interface Category {
	id: string;
	name: string;
	type: string;
}

const FormTransactionContainer: React.FC<FormTransactionProps> = ({
	className,
	onSave,
}) => {
	const [selectValues, handleSelectChange] = useSelectValues(3);
	const [amount, setAmount] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [errors, setErrors] = useState<Errors>({});
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	const isCreating = !!useMatch('/transaction');
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);
	const { categories } = useSelector(selectCategories);
	const { accounts } = useSelector(selectAccounts);

	const { id: idTransaction } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isCreating) {
			const fetchTransaction = async () => {
				try {
					const response = await fetch(`/api/transaction/${idTransaction}`);
					if (!response.ok) throw new Error('Transaction not found');
					const data = await response.json();
					if (data.error) throw new Error('Transaction not found');
					handleSelectChange('select1', data.transaction.type);
					handleSelectChange('select2', data.transaction.categoryId);
					handleSelectChange('select3', data.transaction.accountId);
					setAmount(data.transaction.amount);
					setDescription(data.transaction.description);
				} catch (e) {
					setErrorFetch((e as Error).message);
				}
			};
			fetchTransaction();
		}
	}, [isCreating, idTransaction, handleSelectChange]);

	const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setAmount(e.target.value);
	const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDescription(e.target.value);

	const filterCategories = categories.filter(
		({ type }: Category) => type === selectValues.select1,
	);

	const handleSelectChangeWithReset = (name: string, value: string) => {
		handleSelectChange(name, value);
		if (name === 'select1') {
			handleSelectChange('select2', '');
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Errors = {};
		if (!amount) newErrors.amount = 'Сумма обязательна';
		if (!description) newErrors.description = 'Описание обязательно';
		if (!selectValues.select1) newErrors.type = 'Тип транзакции обязателен';
		if (!selectValues.select2) newErrors.category = 'Категория обязательна';
		if (!selectValues.select3) newErrors.account = 'Счет обязателен';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleClick = (event: React.FormEvent) => {
		event.preventDefault();
		if (!validateForm()) {
			return;
		}
		const data: TransactionData = {
			userId,
			accountId: selectValues.select3,
			categoryId: selectValues.select2,
			amount: Number(amount),
			type: selectValues.select1,
			description,
		};

		if (isCreating) {
			onSave(event, saveTransactionAsync(data));
		} else {
			onSave(event, updateTransactionAsync(idTransaction, data));
		}
	};

	const deleteItem = (event: React.MouseEvent) => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					onSave(event, removeTransactionAsync(idTransaction));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	if (errorFetch) {
		return <ErrorPage error={errorFetch} />;
	}

	return (
		<form className={className}>
			<h3>Добавить операцию</h3>
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0px"
					top="-5px"
					onClick={deleteItem}
				/>
			)}
			<Select
				label="Тип транзакции"
				name="select1"
				data={[
					{ id: 'income', name: 'Доход' },
					{ id: 'expense', name: 'Расход' },
				]}
				value={selectValues.select1}
				onSelectChange={handleSelectChangeWithReset}
			/>
			{errors.type && <div style={{ color: 'red' }}>{errors.type}</div>}
			<div className="select">
				<Select
					label="Категория"
					name="select2"
					data={filterCategories}
					value={selectValues.select2}
					onSelectChange={handleSelectChange}
				/>
				<IconButton
					onClick={() => navigate('/category')}
					icon={ADD_ICON}
					width="30px"
					position="absolute"
					right="-40px"
				/>
			</div>
			{errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
			<div className="select">
				<Select
					label="Счет"
					name="select3"
					data={accounts}
					value={selectValues.select3}
					onSelectChange={handleSelectChange}
				/>
				{errors.account && <div style={{ color: 'red' }}>{errors.account}</div>}
				<IconButton
					onClick={() => navigate('/account')}
					icon={ADD_ICON}
					width="30px"
					position="absolute"
					right="-40px"
				/>
			</div>
			<div>Сумма</div>
			<Input width="100%" type="number" onChange={onAmountChange} value={amount} />
			{errors.amount && <div style={{ color: 'red' }}>{errors.amount}</div>}
			<div>Описание</div>
			<Input width="100%" onChange={onDescriptionChange} value={description} />
			{errors.description && (
				<div style={{ color: 'red' }}>{errors.description}</div>
			)}
			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormTransaction = styled(FormTransactionContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;

	& .select {
		display: flex;
		align-items: center;
	}
`;
