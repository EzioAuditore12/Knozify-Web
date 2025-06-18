import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react', 
      autoCodeSplitting: true, 
      routesDirectory: "./src/app",
      routeToken: "_layout",
    }),
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {target:'19'}]
        ]
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
