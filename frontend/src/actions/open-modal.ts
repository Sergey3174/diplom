import { ACTION_TYPE } from './action-type';

interface ModalParams {
	text: string;
	onConfirm: () => void;
	onCancel: () => void;
}

interface OpenModalAction {
	type: typeof ACTION_TYPE.OPEN_MODAL;
	payload: ModalParams;
	[key: string]: any;
}

export const openModal = (modalParams: ModalParams): OpenModalAction => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
});
