// Módulo: Sistema de Temas y Personalización
// NO modificar sin aprobación

export const userConfig = {
    theme: localStorage.getItem('theme') || 'dark',
    colorPalette: localStorage.getItem('colorPalette') || 'blue',
    bgIntensity: parseInt(localStorage.getItem('bgIntensity') || '900'),
    highlightIntensity: parseInt(localStorage.getItem('highlightIntensity') || '100'),
    textMode: localStorage.getItem('textMode') || 'auto'
};

export const colorPalettes = {
    gray: { name: 'Gris', bg: 'slate', accent: 'gray' },
    lightGray: { name: 'Gris Claro', bg: 'gray', accent: 'slate' },
    blue: { name: 'Azul', bg: 'blue', accent: 'sky' },
    green: { name: 'Verde', bg: 'green', accent: 'emerald' },
    red: { name: 'Rojo', bg: 'red', accent: 'rose' },
    purple: { name: 'Morado', bg: 'purple', accent: 'violet' }
};

export function getTextColor(bgIntensity) {
    if (userConfig.textMode === 'light') return 'text-white';
    if (userConfig.textMode === 'dark') return 'text-gray-900';
    return bgIntensity <= 500 ? 'text-gray-900' : 'text-white';
}

export function getTextMuted(bgIntensity) {
    return bgIntensity <= 500 ? 'text-gray-600' : 'text-gray-300';
}

export function applyTheme() {
    const palette = colorPalettes[userConfig.colorPalette];
    const textColor = getTextColor(userConfig.bgIntensity);

    document.documentElement.style.setProperty('--bg-color', `var(--${palette.bg}-${userConfig.bgIntensity})`);
    document.documentElement.style.setProperty('--sidebar-color', `var(--${palette.bg}-${Math.min(userConfig.bgIntensity + 50, 950)})`);
    document.documentElement.style.setProperty('--accent-color', `var(--${palette.accent}-${userConfig.highlightIntensity})`);

    document.body.className = `bg-${palette.bg}-${userConfig.bgIntensity} ${textColor}`;
    document.body.style.filter = `saturate(${userConfig.bgIntensity}%)`;

    const aside = document.querySelector('aside');
    if (aside) {
        aside.className = `fixed left-0 top-0 h-full w-64 bg-${palette.bg}-${Math.min(userConfig.bgIntensity + 50, 950)} border-r border-${palette.bg}-${userConfig.bgIntensity <= 500 ? '300' : '800'} flex flex-col`;
    }

    localStorage.setItem('theme', userConfig.theme);
    localStorage.setItem('colorPalette', userConfig.colorPalette);
    localStorage.setItem('bgIntensity', userConfig.bgIntensity);
    localStorage.setItem('highlightIntensity', userConfig.highlightIntensity);
    localStorage.setItem('textMode', userConfig.textMode);
}

export function setColorPalette(palette) {
    userConfig.colorPalette = palette;
    applyTheme();
    if (window.renderContent) window.renderContent();
}

export function setBgIntensity(value) {
    userConfig.bgIntensity = parseInt(value);
    applyTheme();
    if (window.renderContent) window.renderContent();
}

export function setHighlightIntensity(value) {
    userConfig.highlightIntensity = parseInt(value);
    applyTheme();
}

export function setTextMode(mode) {
    userConfig.textMode = mode;
    applyTheme();
    if (window.renderContent) window.renderContent();
}

export function toggleTheme() {
    userConfig.theme = userConfig.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    if (window.renderMenu) window.renderMenu();
    if (window.renderContent) window.renderContent();
}

// Exponer funciones globalmente para onclick
window.setColorPalette = setColorPalette;
window.setBgIntensity = setBgIntensity;
window.setHighlightIntensity = setHighlightIntensity;
window.setTextMode = setTextMode;
window.toggleTheme = toggleTheme;
