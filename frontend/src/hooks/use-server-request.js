import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	return useCallback((operation, ...params) => {
		return server[operation](...params);
	}, []);
};
