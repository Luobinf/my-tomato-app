import { ADD_TOMATO} from '../actionTypes';

export default function (state: any[] = [],action: { type: any; payload: any; }) {
  switch (action.type) {
    case ADD_TOMATO:
      return [...state,action.payload];
    default:
      return state;
  }
}
