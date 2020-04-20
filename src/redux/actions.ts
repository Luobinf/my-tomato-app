import {ADD_TODO, INIT_TODOS, UPDATE_TODOS, EDIT_TODO, ADD_TOMATO} from './actionTypes';

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload
  };
};

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  };
};

export const updateTodos = (payload: any) => {
  return {
    type: UPDATE_TODOS,
    payload
  };
};

export const editTodo = (payload: number) => {
  return {
    type: EDIT_TODO,
    payload
  };
};

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  };
};
