export const ModeSelector = ({ mode, onModeChange }) => {
  return (
    <div className="mode-selector">
      <button 
        className={`mode-btn ${mode === 'pomodoro' ? 'active' : ''}`}
        onClick={() => onModeChange('pomodoro')}
      >
        Pomodoro
      </button>
      <button 
        className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
        onClick={() => onModeChange('shortBreak')}
      >
        Descanso Corto
      </button>
      <button 
        className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
        onClick={() => onModeChange('longBreak')}
      >
        Descanso Largo
      </button>
    </div>
  )
}