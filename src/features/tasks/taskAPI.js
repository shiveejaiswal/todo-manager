const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasksFromAPI = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(task => ({
      id: task.id.toString(),
      title: task.title,
      description: 'Task from API', // API doesn't provide descriptions
      completed: task.completed
    }));
  } catch (error) {
    throw error;
  }
};

export const createTaskAPI = async (task) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return task; // Return the original task as JSONPlaceholder doesn't actually create
  } catch (error) {
    throw error;
  }
};

export const updateTaskAPI = async (task) => {
  try {
    const response = await fetch(`${BASE_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return task; // Return the original task as JSONPlaceholder doesn't actually update
  } catch (error) {
    throw error;
  }
};

export const deleteTaskAPI = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return id;
  } catch (error) {
    throw error;
  }
};

