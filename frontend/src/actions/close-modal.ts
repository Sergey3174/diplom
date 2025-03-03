import { ACTION_TYPE } from './action-type';

interface CloseModalAction {
	type: typeof ACTION_TYPE.CLOSE_MODAL;
	[key: string]: any;
}

export const CLOSE_MODAL: CloseModalAction = {
	type: ACTION_TYPE.CLOSE_MODAL,
};
