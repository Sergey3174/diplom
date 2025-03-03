import styled from 'styled-components';
import V_ICON from '../../assets/V.png';
import X_ICON from '../../assets/X.png';
import { IconButton } from '../icon-button/icon-button';
import { Input } from '../input/input';
import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFormContainerProps {
	className?: string;
	title?: string;
	name: string;
	handleIsChange: (name: string) => void;
	register?: UseFormRegisterReturn;
	setValue: (name: string) => void;
}

const InputFormContainer = forwardRef<HTMLDivElement, InputFormContainerProps>(
	({ className, title, name, handleIsChange, register, setValue }, ref) => {
		return (
			<div className={className} ref={ref}>
				{title && <div>Новая категория</div>}
				{/* Используем register в качестве рефа */}
				<Input {...register} width="100%" margin="10px 0" />
				<div className="button-confirm-cancel">
					{!register && <IconButton icon={V_ICON} width="30px" />}
					<IconButton
						icon={X_ICON}
						width="20px"
						onClick={() => {
							handleIsChange(name);
							setValue(name);
						}}
					/>
				</div>
			</div>
		);
	},
);

InputFormContainer.displayName = 'InputFormContainer';

export const InputForm = styled(InputFormContainer)`
	position: relative;
	display: flex;

	& .button-confirm-cancel {
		display: flex;
		align-items: center;
	}
`;
