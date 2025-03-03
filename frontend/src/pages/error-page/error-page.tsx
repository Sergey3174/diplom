import React from 'react';

interface ErrorPageProps {
	error: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
	return (
		<div style={{ textAlign: 'center', padding: '50px' }}>
			<h1>Oops! Page not found.</h1>
			<p>{error}</p>
		</div>
	);
};
