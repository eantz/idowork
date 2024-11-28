import { callDelete, callGet, callPost, callPut } from "@/helper/be-caller";

export async function getTodo(timeConstraint, status, date) {
  return await callGet('todo', {
    timeConstraint: timeConstraint,
    status: status,
    date: date,
  });
}

export async function createTodo(message, scheduledAt) {
  return await callPost('todo/create', {
    message,
    scheduledAt
  });
}

export async function updateTodo(id, message, status, scheduledAt) {
  return await callPut('todo/update', {
    id,
    message,
    status,
    scheduledAt
  })
}

export async function deleteTodo(id) {
  return await callDelete('todo/delete/' + id);
}