import dayjs from "dayjs";

const todoKey = 'todo';

export function getTodo(categoryId, schedule, isDone) {
  const todoData = localStorage.getItem(todoKey);

  let todo = todoData != null ? JSON.parse(todoData) : [];




  if (categoryId !== undefined && !isDone) {
    if (categoryId === 'uncategorized') {
      todo = todo.filter(todoItem => todoItem.categoryId === '');
    } else {
      todo = todo.filter(todoItem => todoItem.categoryId === categoryId);
    }
  }

  const now = dayjs();

  if (schedule !== undefined && !isDone) {
    if (schedule === 'today') {
      todo = todo.filter(todoItem => todoItem.schedule === dayjs().format('YYYY-MM-DD') && !todoItem.isDone)
    } else if (schedule === 'past') {
      todo = todo.filter(todoItem => {
        const todoSchedule = dayjs(todoItem.schedule);
        
        return todoSchedule.isBefore(now, 'day') && todoSchedule.isAfter(now.subtract(2, 'day') && !todoItem.isDone)
      })
    } else if (schedule === 'upcoming') {
      todo = todo.filter(todoItem => {
        const todoSchedule = dayjs(todoItem.schedule);

        return todoSchedule.isAfter(now, 'day') && todoSchedule.isBefore(now.add(2, 'day') && !todoItem.isDone)
      })
    } else if (schedule === 'unscheduled') {
      todo = todo.filter(todoItem => todoItem.schedule === '' && !todoItem.isDone);
    } else {
      todo = todo.filter(todoItem => todoItem.schedule === schedule && !todoItem.isDone);
    }
    
  }

  if (isDone) {
    todo = todo.filter(todoItem => {
      if (!todoItem.isDone) {
        return false
      }
      const doneDate = dayjs(todoItem.doneDate);

      return doneDate.isAfter(now.subtract(2, 'day'));
    });
  } 

  return todo;
}

export function insertTodo(todoItem) {
  const todo = getTodo();

  const randomId = Math.random().toString(36).substring(2,7);
  todoItem.id = randomId;

  const lastOrder = todo.length > 0 ? todo[todo.length - 1].order : 0;
  todoItem.order = lastOrder + 1;
  
  const newTodo = [...todo, todoItem];

  localStorage.setItem(todoKey, JSON.stringify(newTodo));

  return todoItem;
}

export function removeTodo(id) {
  const todo = getTodo();

  const filteredTodo = todo.filter((todoItem) => todoItem.id !== id);

  localStorage.setItem(todoKey, JSON.stringify(filteredTodo));
}

export function editTodo(todoItem) {
  let todo = getTodo();

  const filteredTodoIndex = todo.findIndex((td) => td.id === todoItem.id);

  if (filteredTodoIndex === -1) {
    return todo;
  }

  let todoItemModified = {...todoItem}

  // delete keys that shouldn't be replaced
  delete todoItemModified["isDone"];
  delete todoItemModified["doneDate"];

  todo[filteredTodoIndex] = {...todo[filteredTodoIndex], ...todoItemModified};

  localStorage.setItem(todoKey, JSON.stringify(todo));

  return todoItem;
}

export function toggleTodo(id) {
  let todo = getTodo();

  const filteredTodoIndex = todo.findIndex((td) => td.id === id);

  if (filteredTodoIndex === -1) {
    return todo;
  }

  const isDone = todo[filteredTodoIndex].isDone

  todo[filteredTodoIndex].isDone = !isDone
  todo[filteredTodoIndex].doneDate = !isDone ? dayjs().format('YYYY-MM-DD') : '';
  
  localStorage.setItem(todoKey, JSON.stringify(todo));

  return todo[filteredTodoIndex];
}