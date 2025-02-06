export const ErrorPage = ({ error }) => {
	return (
		<div style={{ textAlign: 'center', padding: '50px' }}>
			<h1>Oops! Page not found.</h1>
			<p>{error}</p>
		</div>
	);
};
