import {
  TEXT_CHANGED,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  RECEIVE_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE_FAIL,
} from './types';

export const textChanged = (text) => {
  return {
      type: TEXT_CHANGED,
      payload: text
    };
};
