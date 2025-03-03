import { forwardRef } from 'react';
import styled from 'styled-components';

interface SelectContainerProps {
	className?: string;
	data: { id: string | number; name: string }[];
	value: string | number;
	onSelectChange: (name: string, value: string) => void;
	name: string;
	label?: string | null;
	width?: string;
}

const SelectContainer = forwardRef<HTMLSelectElement, SelectContainerProps>(
	({ className, data, value, onSelectChange, name, label = null }, ref) => {
		const handleSelectChange = (target: HTMLSelectElement) => {
			const newValue = target.value;
			onSelectChange(name, newValue);
		};

		return (
			<div className={className}>
				{label && (
					<label className="label-style" htmlFor="select1">
						{label}
					</label>
				)}
				<select
					className="select-style"
					value={value}
					onChange={({ target }) => handleSelectChange(target)}
					ref={ref}
				>
					{!value && <option value="">Выберите</option>}
					{data.map((item) => (
						<option key={item.id} value={item.id}>
							{item.name}
						</option>
					))}
				</select>
			</div>
		);
	},
);

SelectContainer.displayName = 'SelectContainer';

export const Select = styled(SelectContainer)<SelectContainerProps>`
	width: ${({ width = '100%' }) => width};
	margin: 10px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	& .select-style {
		display: block;
		margin-left: 8px;
		width: 100%;
		padding: 10px 40px 10px 15px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
		font-size: 16px;
		transition: border-color 0.3s;
		&:hover {
			border-color: #007bff;
		}

		&:focus {
			outline: none;
			border-color: #007bff;
		}
	}

	& .label-style {
		display: block;
		width: 40%;
	}

	@media (max-width: 1000px) {
		width: 100%;
		& .select-style {
			font-size: 0.6rem;
		}
	}
`;
