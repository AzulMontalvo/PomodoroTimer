export const TimerDisplay = ({ modeLabel, formattedTime, completedPomodoros }) => {
  return (
    <div className="timer-display">
      <div className="timer-circle">
        <h2 className="mode-label">{modeLabel}</h2>
        <div className="time">{formattedTime}</div>
        <div className="pomodoro-count">
          Pomodoros completados: {completedPomodoros}
        </div>
      </div>
    </div>
  )
}