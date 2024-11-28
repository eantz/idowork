import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './category'
import todoReducer from './todo'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    todo: todoReducer,
  }
});

export default store