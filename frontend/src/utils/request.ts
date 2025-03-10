export async function request(url: string, method: string = 'GET', data?: any){
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	})
		.then((res) => res.json())
		.catch((error) => {
			console.error('Что-то пошло не так:', error);
		});
}
