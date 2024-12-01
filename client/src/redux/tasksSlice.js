import { createSlice } from "@reduxjs/toolkit";

// const tasksInitialState = [
//   { id: 0, text: "Learn HTML and CSS", completed: true },
//   { id: 1, text: "Get good at JavaScript", completed: true },
//   { id: 2, text: "Master React", completed: false },
//   { id: 3, text: "Discover Redux", completed: false },
//   { id: 4, text: "Build amazing apps", completed: false },
// ];

let tasksInitialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {
    addListOfTasks: {
      reducer(state, action) {
        state.push(...action.payload);
      },
    },
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text, id, completed) {
        return {
          payload: {
            text,
            id,
            completed,
          },
        };
      },
    },
    deleteTask(state, action) {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const task of state) {
        if (task.id === action.payload) {
          task.completed = !task.completed;
          break;
        }
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleCompleted,
  addListOfTasks,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
