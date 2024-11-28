import { insertCategory, getCategories, removeCategory, editCategory } from "../app/fetcher/category";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    addCategory(state, action) {
      const categories = insertCategory(action.payload);

      state.categories = categories;
    },
    removeCategory(state, action) {
      const categories = removeCategory(action.payload);

      state.categories = categories;
    },
    editCategory(state, action) {
      const categories = editCategory(action.payload);

      state.categories = categories;
    },
    populateCategories(state, action) {
      const isForce = action.payload === 'force';

      if (!isForce && state.categories.length > 0) {
        return
      }

      const categories = getCategories()

      state.categories = categories;
    }
  }
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;