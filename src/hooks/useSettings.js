import { useState, useEffect } from 'react'

const DEFAULT_SETTINGS = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  pomodorosBeforeLongBreak: 4
}

export const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)

  // Cargar configuración del localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings))
  }, [settings])

  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    setShowSettings(false)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const closeSettings = () => {
    setShowSettings(false)
  }

  return {
    settings,
    showSettings,
    updateSettings,
    toggleSettings,
    closeSettings
  }
}