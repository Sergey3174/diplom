import { ACTION_TYPE } from './action-type';

interface ResetFilterAction {
	type: typeof ACTION_TYPE.RESET_FILTER;
	[key: string]: any;
}

export const RESET_FILTER: ResetFilterAction = {
	type: ACTION_TYPE.RESET_FILTER,
};
