import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskAPI from './taskAPI';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return await taskAPI.fetchTasksFromAPI();
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task) => {
    return await taskAPI.createTaskAPI(task);
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task) => {
    await taskAPI.updateTaskAPI(task);
    return task; // Return the original task as JSONPlaceholder doesn't actually update
  }
);

export const removeTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await taskAPI.deleteTaskAPI(id);
    return id;
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;

