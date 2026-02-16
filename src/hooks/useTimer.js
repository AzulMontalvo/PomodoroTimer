import { useState, useEffect, useRef, useCallback } from 'react'

export const useTimer = (settings) => {
  const [mode, setMode] = useState('pomodoro')
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  
  const intervalRef = useRef(null)
  const audioRef = useRef(null)
  const timerCompleteRef = useRef(false)

  // Función para obtener el tiempo según el modo
  const getTimeForMode = useCallback((currentMode) => {
    switch(currentMode) {
      case 'pomodoro': return settings.pomodoroTime * 60
      case 'shortBreak': return settings.shortBreakTime * 60
      case 'longBreak': return settings.longBreakTime * 60
      default: return settings.pomodoroTime * 60
    }
  }, [settings.pomodoroTime, settings.shortBreakTime, settings.longBreakTime])

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [])

  const switchMode = useCallback((newMode) => {
    setMode(newMode)
    setTimeLeft(getTimeForMode(newMode))
    setIsRunning(false)
  }, [getTimeForMode])

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(getTimeForMode(mode))
  }, [mode, getTimeForMode])

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getModeLabel = useCallback(() => {
    switch(mode) {
      case 'pomodoro': return 'Pomodoro'
      case 'shortBreak': return 'Descanso Corto'
      case 'longBreak': return 'Descanso Largo'
      default: return 'Pomodoro'
    }
  }, [mode])

  // Effect: Actualizar tiempo cuando cambia la configuración
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getTimeForMode(mode))
    }
  }, [settings, mode, isRunning, getTimeForMode])

  // Effect: Timer countdown
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    if (timeLeft <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      
      // Marcar que el timer completó
      if (!timerCompleteRef.current) {
        timerCompleteRef.current = true
        setIsRunning(false)
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        if (newTime <= 0) {
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, timeLeft])

  // Effect: Manejar completado del timer (separado)
  useEffect(() => {
    if (timerCompleteRef.current && !isRunning && timeLeft === 0) {
      timerCompleteRef.current = false
      playSound()
      
      if (mode === 'pomodoro') {
        setCompletedPomodoros(prev => {
          const newCount = prev + 1
          // Programar el cambio de modo para el siguiente render
          requestAnimationFrame(() => {
            const nextMode = newCount % settings.pomodorosBeforeLongBreak === 0 
              ? 'longBreak' 
              : 'shortBreak'
            switchMode(nextMode)
          })
          return newCount
        })
      } else {
        requestAnimationFrame(() => {
          switchMode('pomodoro')
        })
      }
    }
  }, [isRunning, timeLeft, mode, settings.pomodorosBeforeLongBreak, playSound, switchMode])

  return {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    audioRef,
    switchMode,
    toggleTimer,
    resetTimer,
    formatTime,
    getModeLabel
  }
}