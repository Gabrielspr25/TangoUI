// Entry point para Centro de Control
import React from 'react'
import ReactDOM from 'react-dom/client'
import CentroControlAgentes from './agentes/CentroControlAgentes.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CentroControlAgentes />
    </React.StrictMode>,
)
