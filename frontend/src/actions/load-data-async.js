import { setAccountsData } from './set-accounts-data';
import { setCategoriesData } from './set-categories-data';
import { setTypeAccounts } from './set-accounts-types';
import { ACTION_TYPE } from './action-type';
import { request } from '../utils';

export const loadDataAsync = (userId) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.SET_LOADING });
	return request(`/api/main/${userId}`)
		.then((res) => {
			if (res) {
				dispatch(setCategoriesData(res.data.categories));
				dispatch(setAccountsData(res.data.accounts));
				dispatch(setTypeAccounts(res.data.typeAccount));
				return {
					lastIncomeTransactions: res.data.lastIncomeTransactions,
					lastExpenseTransactions: res.data.lastExpenseTransactions,
				};
			}

			return res;
		})
		.finally(() => dispatch({ type: ACTION_TYPE.SET_LOADING }));
};
