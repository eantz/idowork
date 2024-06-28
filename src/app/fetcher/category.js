const categoryKey = "category";

export function getCategories() {
  const categoriesData = localStorage.getItem(categoryKey);

  const categories = categoriesData != null ? JSON.parse(categoriesData) : [];

  return categories;
}

export function insertCategory(category) {
  const categories = getCategories();

  const randomId = Math.random().toString(36).substring(2,7);
  category.id = randomId;

  const lastOrder = categories.length > 0 ? categories[categories.length - 1].order : 0;
  category.order = lastOrder + 1;
  
  const newCategories = [...categories, category];

  localStorage.setItem(categoryKey, JSON.stringify(newCategories));

  return newCategories;
}

export function removeCategory(id) {
  const categories = getCategories();

  const filteredCategories = categories.filter((category) => category.id !== id);

  localStorage.setItem(categoryKey, JSON.stringify(filteredCategories));

  return filteredCategories;
}

export function editCategory(category) {
  let categories = getCategories();

  const filteredCategoriesIndex = categories.findIndex((cat) => cat.id === category.id);

  if (filteredCategoriesIndex === -1) {
    return categories;
  }

  categories[filteredCategoriesIndex] = category;

  localStorage.setItem(categoryKey, JSON.stringify(categories));

  return categories;
}

