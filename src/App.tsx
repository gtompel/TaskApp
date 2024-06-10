import React, { useState } from 'react';
import TaskList from './components/TaskList';
import { Button, TextField } from '@mui/material';
import './App.css';


const App: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <div>
      <TextField
        label="Add Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button onClick={handleAddTask}>Add</Button>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;