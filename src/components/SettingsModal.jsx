import { useState } from 'react'

export const SettingsModal = ({ settings, onSave, onClose }) => {
  const [formData, setFormData] = useState(settings)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: parseInt(value) || 0 })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Configuración</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="setting-group">
            <label>Tiempo Pomodoro (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.pomodoroTime}
              onChange={(e) => handleChange('pomodoroTime', e.target.value)}
            />
          </div>

          <div className="setting-group">
            <label>Tiempo Descanso Corto (minutos)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.shortBreakTime}
              onChange={(e) => handleChange('shortBreakTime', e.target.value)}
            />
          </div>

          <div className="setting-group">
            <label>Tiempo Descanso Largo (minutos)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.longBreakTime}
              onChange={(e) => handleChange('longBreakTime', e.target.value)}
            />
          </div>

          <div className="setting-group">
            <label>Pomodoros antes del descanso largo</label>
            <input
              type="number"
              min="2"
              max="10"
              value={formData.pomodorosBeforeLongBreak}
              onChange={(e) => handleChange('pomodorosBeforeLongBreak', e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Guardar</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}