import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import App from './App'
import './index.css' // 👈 VITAL: Si esta línea no está, el Nav se ve como texto azul

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      {/* La clase 'dark' es necesaria para que el texto sea blanco y el fondo oscuro */}
      <main className="dark text-foreground bg-background min-h-screen">
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>,
)