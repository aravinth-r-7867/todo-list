export default {
  headers: [
    {
      name: 'checkbox',
      type: 'checkbox',
      selected: false,
      displayName: '',
    },
    {
      name: 'task',
      type: 'text',
      displayName: 'Task',
    },
  ],
  body: [
    {
      id: 0,
      checkbox: {
        name: 'checkbox',
        type: 'checkbox',
        selected: false,
      },
      task: {
        name: 'task_name',
        value: 'My first task',
      },
    },
  ],
};
