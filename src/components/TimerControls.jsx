export const TimerControls = ({ isRunning, onToggle, onReset }) => {
  return (
    <div className="timer-controls">
      <button className="control-btn start-btn" onClick={onToggle}>
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
      <button className="control-btn reset-btn" onClick={onReset}>
        Reiniciar
      </button>
    </div>
  )
}