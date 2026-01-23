// Wrapper para integrar CentroControlAgentes en main.js
import { createRoot } from 'react-dom/client';
import CentroControlAgentes from './CentroControlAgentes.jsx';

export function renderCentroControlAgentes(containerElement) {
    const root = createRoot(containerElement);
    root.render(CentroControlAgentes());
}

export function getCentroControlContent() {
    const container = document.createElement('div');
    container.id = 'centro-control-root';
    container.className = 'w-full h-full';

    // Renderizar el componente React
    setTimeout(() => {
        renderCentroControlAgentes(container);
    }, 0);

    return container;
}
