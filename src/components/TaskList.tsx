import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface TaskListProps {
  tasks: string[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemText primary={task} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;