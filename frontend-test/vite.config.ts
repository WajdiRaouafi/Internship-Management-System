// import { defineConfig } from 'vite';
// import { createAngularPlugin } from 'vite-plugin-angular'; // Hypothetical, use the correct setup for Angular

// export default defineConfig({
//   plugins: [
//     createAngularPlugin(), // Adjust if you find a suitable Angular plugin or remove if not needed
//   ],
//   build: {
//     sourcemap: true, // Enable source maps for debugging
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080', // Adjust to your Spring Boot backend URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
