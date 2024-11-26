import { callPost } from "../helper/be-caller";

export async function register(username, password) {
  return callPost('auth/register', {
    username: username,
    password: password,
  })
}

export async function login(username, password) {
  return await callPost('auth/login', {
    username: username,
    password: password,
  });
}