import styled from 'styled-components';
import V_ICON from '../../assets/V.png';
import X_ICON from '../../assets/X.png';
import { IconButton } from '../icon-button/icon-button';
import { Input } from '../input/input';
import { forwardRef } from 'react';

const InputFormContainer = forwardRef(
	({ className, title, name, handleIsChange, register, setValue }, ref) => {
		return (
			<div className={className}>
				{title && <div>Новая категория</div>}
				<Input ref={ref} width="100%" margin="10px 0" {...register} />
				<div className="button-confirm-cancel">
					{!register && (
						<IconButton
							icon={V_ICON}
							width="30px"
							// onClick={}
						/>
					)}
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
