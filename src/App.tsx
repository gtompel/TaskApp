import { useState } from 'react';
import { Task } from './components/Task';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import './App.css';



const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj: Task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div>
      <h1>Список задач</h1>
      <TextField
        label="Введите новую задачу"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button variant="contained" onClick={addTask}>
        Добавить задачу
      </Button>

      <h2>Невыполненные задачи</h2>
      <List>
        {incompleteTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText>{task.title}</ListItemText>
            <Button
              variant="contained"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              Завершить
            </Button>
          </ListItem>
        ))}
      </List>

      <h2>Выполненные задачи</h2>
      <List>
        {completedTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText>{task.title}</ListItemText>
            <Button
              variant="contained"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              Отменить завершение
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default App;