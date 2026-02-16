import { useState, useEffect } from 'react'

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false)

  // Cargar tema del localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('pomodoro-theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Guardar tema en localStorage y aplicar clase al body
  useEffect(() => {
    localStorage.setItem('pomodoro-theme', darkMode ? 'dark' : 'light')
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return {
    darkMode,
    toggleTheme
  }
}