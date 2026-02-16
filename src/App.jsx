import './App.css'
import { useTimer } from './hooks/useTimer'
import { useTasks } from './hooks/useTasks'
import { useSettings } from './hooks/useSettings'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { ModeSelector } from './components/ModeSelector'
import { TimerDisplay } from './components/TimerDisplay'
import { TimerControls } from './components/TimerControls'
import { TasksList } from './components/TasksList'
import { SettingsModal } from './components/SettingsModal'

function App() {
  // Custom Hooks - Lógica
  const { settings, showSettings, updateSettings, toggleSettings, closeSettings } = useSettings()
  const { darkMode, toggleTheme } = useTheme()
  const {
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
  } = useTimer(settings)
  const {
    tasks,
    newTaskText,
    setNewTaskText,
    addTask,
    toggleTask,
    deleteTask
  } = useTasks()

  return (
    <div className="app">
      {/* Audio para notificaciones */}
      <audio 
        ref={audioRef} 
        src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVq/m77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHgU2jdXzzn0vBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHgU1i9Tx0H0wBSCAy/HajDwIF2az6+udTREOTKfj8bllHg==" 
      />
      
      {/* Header con controles */}
      <Header 
        onSettingsClick={toggleSettings}
        onThemeToggle={toggleTheme}
        darkMode={darkMode}
      />

      {/* Modal de configuración */}
      {showSettings && (
        <SettingsModal 
          settings={settings}
          onSave={updateSettings}
          onClose={closeSettings}
        />
      )}

      {/* Contenido principal */}
      <main className="main-content">
        {/* Sección del Timer */}
        <div className="timer-section">
          <ModeSelector 
            mode={mode}
            onModeChange={switchMode}
          />
          
          <TimerDisplay 
            modeLabel={getModeLabel()}
            formattedTime={formatTime(timeLeft)}
            completedPomodoros={completedPomodoros}
          />
          
          <TimerControls 
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
        </div>

        {/* Sección de Tareas */}
        <TasksList 
          tasks={tasks}
          newTaskText={newTaskText}
          onTaskTextChange={setNewTaskText}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  )
}

export default App