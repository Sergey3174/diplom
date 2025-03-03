import styled from 'styled-components';
import { Button, IconButton, Input, Select } from '../../../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories, selectUserId } from '../../../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import TRASH from '../../../../assets/trash.png';
import { saveCategoryAsync } from '../../../../actions';
import { ErrorPage } from '../../../error-page/error-page';

interface Category {
	id: string;
	name: string;
	type: string;
}

interface FormCategoryProps {
	className?: string;
	onSave: (event: React.FormEvent, action: any, method?: string, data?: any) => void;
}

interface Errors {
	select?: string;
	name?: string;
}

const FormCategoryContainer: React.FC<FormCategoryProps> = ({ className, onSave }) => {
	const [select, setSelect] = useState<string>('');
	const [nameCategory, setNameCategory] = useState<string>('');
	const [errors, setErrors] = useState<Errors>({});
	const [errorFetch, setErrorFetch] = useState<string | null>(null);

	const isCreating = !!useMatch('/category');
	const userId = useSelector(selectUserId);
	const { id: idCategory } = useParams<{ id: string }>();
	const { categories } = useSelector(selectCategories);

	useEffect(() => {
		if (!isCreating && categories.length !== 0) {
			const category = categories.find((cat: Category) => cat.id === idCategory);
			if (!category) {
				setErrorFetch('Такой категории не существует');
				return;
			}
			setSelect(category?.type);
			setNameCategory(category?.name);
		}
	}, [isCreating, categories, idCategory]);

	const onNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
		setNameCategory(target.value);

	const handleSelectChange = (name: string, value: string) => setSelect(value);

	const validateForm = (): boolean => {
		const newErrors: Errors = {};
		if (!select) {
			newErrors.select = 'Тип категории обязателен';
		}
		if (!nameCategory) {
			newErrors.name = 'Имя категории обязательно';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleClick = (event: React.FormEvent) => {
		event.preventDefault();
		if (validateForm()) {
			const data = {
				userId,
				name: nameCategory,
				type: select,
			};
			isCreating
				? onSave(event, saveCategoryAsync(data))
				: onSave(event, `/api/category/${idCategory}`, 'PATCH', data);
		}
	};

	if (errorFetch) {
		return <ErrorPage error={errorFetch} />;
	}

	return (
		<form className={className}>
			<h3>Добавить категорию</h3>
			{!isCreating && (
				<IconButton
					icon={TRASH}
					width="30px"
					position="absolute"
					right="0"
					top="-5px"
					onClick={(event) =>
						onSave(event, `/api/category/${idCategory}`, 'DELETE')
					}
				/>
			)}

			<Select
				label="Тип категории"
				name="select1"
				data={[
					{ id: 'income', name: 'Доход' },
					{ id: 'expense', name: 'Расход' },
				]}
				value={select}
				onSelectChange={handleSelectChange}
			/>
			{errors.select && <div style={{ color: 'red' }}>{errors.select}</div>}

			<div>Описание</div>
			<Input width="100%" onChange={onNameChange} value={nameCategory} />
			{errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

			<Button width="50%" onClick={handleClick}>
				Отправить
			</Button>
		</form>
	);
};

export const FormCategory = styled(FormCategoryContainer)`
	width: 80%;
	margin: 0 auto;
	position: relative;
`;
