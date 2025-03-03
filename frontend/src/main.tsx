import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);
