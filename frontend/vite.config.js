import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/', // или другой базовый путь, если нужно

	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
			},
			// '/transaction': {
			// 	target: 'http://localhost:3001', // Адрес вашего сервера бэкенда
			// 	changeOrigin: true, // Меняет источник для предотвращения CORS
			// 	rewrite: (path) => path.replace(/^\/transaction/, ''), // Убирает /transaction из пути, если нужно
			// },
		},
	},
});
