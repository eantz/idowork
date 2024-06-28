import dayjs from "dayjs";
import { getTodo, insertTodo, editTodo, removeTodo, toggleTodo } from "../fetcher/todo";
import { createSlice } from "@reduxjs/toolkit";

 function getTodoSection(todoItem) {

  if (todoItem.isDone) {
    return 'done';
  } else if (todoItem.schedule === '') {
    return 'unscheduled';
  } 

  const now = dayjs();
  const todoSchedule = dayjs(todoItem.schedule, 'YYYY-MM-DD');
  
  if (todoItem.schedule === now.format('YYYY-MM-DD')) {
    return 'today';
  } else if (todoSchedule.isBefore(now, 'day') && todoSchedule.isAfter(now.subtract(2, 'day'))) {
    return 'past';
  } else if (todoSchedule.isAfter(now, 'day') && todoSchedule.isBefore(now.add(2, 'day'))) {
    return 'upcoming';
  }

  return 'todo';
 }

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todo: [],
    today: [],
    upcoming: [],
    unscheduled: [],
    past: [],
    done: []
  },
  reducers: {
    addTodo: function(state, action) {
      const todoItem = insertTodo(action.payload);

      const todoSection = getTodoSection(todoItem);

      state[todoSection].push(todoItem);
    },
    editTodo: function(state, action) {
      const todoItem = editTodo(action.payload.modified);

      const originalSection = getTodoSection(action.payload.original);
      const modifiedSection = getTodoSection(todoItem);

      if (originalSection === modifiedSection) {
        const originalId = state[originalSection].findIndex(td => td.id === todoItem.id);

        state[originalSection][originalId] = todoItem;
      } else {
        const cleanedOriginalTodo = state[originalSection].filter(td => td.id !== todoItem.id);
        state[originalSection] = cleanedOriginalTodo;

        state[modifiedSection].push(todoItem);
      }
    },
    removeTodo: function(state, action) {
      removeTodo(action.payload.id);

      Object.entries(state).forEach(s => {
        const [key, val] = s

        const idxFound = val.findIndex(td => td.id === action.payload.id)
        if (idxFound >= 0) {
          state[key].splice(idxFound, 1);
          return
        }
      });

    },
    toggleTodo: function(state, action) {
      const todoItem = toggleTodo(action.payload.id);

      let originalSection = '';
      let modifiedSection = '';
      if (!todoItem.isDone) {
        originalSection = 'done';
        modifiedSection = getTodoSection(todoItem);
      } else {
        let modifiedTodoItem = {...todoItem};
        delete modifiedTodoItem['isDone'];
        delete modifiedTodoItem['doneDate'];

        originalSection = getTodoSection(modifiedTodoItem);
        modifiedSection = 'done';
      }

      state[originalSection] = state[originalSection].filter(td => td.id !== todoItem.id);
      state[modifiedSection].push(todoItem);

    },
    populateTodo: function(state, action) {
      const isForce = action.payload.type === 'force';

      if (!isForce && state.todo.length > 0) {
        return;
      }

      const today = getTodo(action.payload.categoryId, 'today', false);
      state.today = today;

      const past = getTodo(action.payload.categoryId, 'past', false);
      state.past = past;

      const upcoming = getTodo(action.payload.categoryId, 'upcoming', false);
      state.upcoming = upcoming;

      const unscheduled = getTodo(action.payload.categoryId, 'unscheduled', false);
      state.unscheduled = unscheduled;

      const done = getTodo(action.payload.categoryId, undefined, true);
      state.done = done;
    }
  }
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;