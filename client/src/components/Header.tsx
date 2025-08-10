import { useTheme } from '../contexts/ThemeContext';

function Header() {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <header className="header">
            <div className="header-content">
                <h1>Todo App</h1>
                <button 
                    className="theme-toggle" 
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                >
                    {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'}
                </button>
            </div>
        </header>
    );
}

export default Header;