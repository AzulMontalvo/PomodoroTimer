import { useState, useEffect } from 'react'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [newTaskText, setNewTaskText] = useState('')

  // Cargar tareas del localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (newTaskText.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTaskText, 
        completed: false 
      }])
      setNewTaskText('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    toggleTask,
    deleteTask
  }
}