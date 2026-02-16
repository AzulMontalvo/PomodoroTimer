export const Header = ({ onSettingsClick, onThemeToggle, darkMode }) => {
  return (
    <header className="header">
      <h1>Pomodoro Timer</h1>
      <div className="header-controls">
        <button 
          className="icon-btn"
          onClick={onSettingsClick}
          title="Configuración"
        >
          ⚙️
        </button>
        <button 
          className="icon-btn"
          onClick={onThemeToggle}
          title={darkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}