import { useCallback, useState } from 'react';

interface SelectValues {
	[key: string]: string;
}

export const useSelectValues = (count: number, initialValues: SelectValues = {}) => {
	const defaultValues = Array.from(
		{ length: count },
		(_, i) => `select${i + 1}`,
	).reduce((acc, selectKey) => {
		acc[selectKey] = initialValues[selectKey] || '';
		return acc;
	}, {} as SelectValues);

	const [selectValues, setSelectValues] = useState<SelectValues>(defaultValues);

	const handleSelectChange = useCallback((name: string, value: string) => {
		setSelectValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	}, []);

	return [selectValues, handleSelectChange] as const;
};
