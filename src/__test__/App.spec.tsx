import { shallow, ShallowWrapper } from 'enzyme';
import App from '../App';
import { Task } from '../components/Task';
import '../setupTests';


describe('App', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should add a new task', () => {
    // Организация
    const newTaskInput = wrapper.find('input');
    newTaskInput.simulate('change', { target: { value: 'New Task' } });

    // Действие
    const addTaskButton = wrapper.find('button');
    addTaskButton.simulate('click');

    // Утверждение
    const tasks = wrapper.state('tasks') as Task[];
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('New Task');
    expect(tasks[0].completed).toBe(false);
  });
});