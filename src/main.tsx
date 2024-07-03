import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NextUIProvider>
            <main className="text-foreground bg-app-bg flex place-content-center min-w-[calc(100svw_-_1rem)] max-w-[100vw]">
                <App/>
            </main>
        </NextUIProvider>
    </React.StrictMode>,
)
