import { useCallback, useState } from 'react';

export const useSelectValues = (count, initialValues = {}) => {
	const defaultValues = Array.from(
		{ length: count },
		(_, i) => `select${i + 1}`,
	).reduce((acc, selectKey) => {
		acc[selectKey] = initialValues[selectKey] || '';
		return acc;
	}, {});

	const [selectValues, setSelectValues] = useState(defaultValues);

	const handleSelectChange = useCallback(
		(name, value) => {
			setSelectValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		},
		[setSelectValues],
	);

	return [selectValues, handleSelectChange];
};
