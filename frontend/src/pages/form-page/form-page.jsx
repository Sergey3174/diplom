import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { FormAccount, FormCategory, FormTransaction } from './components';
import { IconButton } from '../../components';
import BACK_ICON from '../../assets/back.png';
import { useDispatch } from 'react-redux';
import { request } from '../../utils';

const FormPageContainer = ({ className }) => {
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { id } = useParams();
	const dispatch = useDispatch();

	const onSave = (event, url, method, data) => {
		event.preventDefault();
		request(url, method, data).then(() => navigate(-1));
	};

	const onSaveStore = (event, action) => {
		event.preventDefault();
		dispatch(action).then(() => navigate(-1));
	};

	const Form = () => {
		switch (pathname) {
			case `/transaction/${id}`:
			case '/transaction':
				return <FormTransaction onSave={onSaveStore} />;
			case `/category/${id}`:
				return <FormCategory onSave={onSave} />;
			case '/category':
				return <FormCategory onSave={onSaveStore} />;
			case `/account/${id}`:
				return <FormAccount onSave={onSave} />;
			case '/account':
				return <FormAccount onSave={onSaveStore} />;
			default:
				return <div>Привет</div>;
		}
	};

	return (
		<div className={className}>
			<IconButton
				icon={BACK_ICON}
				width="30px"
				position="absolute"
				margin="30px 0 0 10px"
				onClick={() => navigate(-1)}
			/>
			{Form()}
		</div>
	);
};

export const FormPage = styled(FormPageContainer)`
	width: 50%;
	margin: 10% auto 0;
	border: 1px solid #e0e0e0;
	padding: 10px;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.2s;
	position: relative;
`;
