export const TasksList = ({ 
  tasks, 
  newTaskText, 
  onTaskTextChange, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}) => {
  return (
    <div className="tasks-section">
      <h2>Tareas</h2>
      
      <form onSubmit={onAddTask} className="task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => onTaskTextChange(e.target.value)}
          placeholder="Añadir nueva tarea..."
          className="task-input"
        />
        <button type="submit" className="add-task-btn">+</button>
      </form>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No hay tareas. ¡Añade una para empezar!</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-task-btn"
      >
        ×
      </button>
    </div>
  )
}