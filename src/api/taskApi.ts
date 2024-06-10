import { Task } from '../types/Task';

const tasks: Task[] = [];

let taskIdCounter = 1;

export const getTasks = async (): Promise<Task[]> => {
  return tasks;
};

export const addTask = async (newTask: Task): Promise<Task> => {
  const taskToAdd: Task = { ...newTask, id: taskIdCounter };
  taskIdCounter++;
  tasks.push(taskToAdd);
  return taskToAdd;
};

export const updateTask = async (taskId: number, data: Partial<Task>): Promise<Task> => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...data };
    return tasks[taskIndex];
  }
  throw new Error('Task not found');
};