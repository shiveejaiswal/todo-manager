import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskAPI from './taskAPI';

// Create async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await taskAPI.fetchTasksFromAPI();
    return response;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task) => {
    const response = await taskAPI.createTaskAPI(task);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task) => {
    const response = await taskAPI.updateTaskAPI(task);
    return response;
  }
);

export const removeTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    const response = await taskAPI.deleteTaskAPI(id);
    return response;
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
