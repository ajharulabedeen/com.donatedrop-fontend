import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USERNAME} from './auth.actions';
import * as fromRoot from '../app.reducer';

export interface AuthState {
  isAuthenticated: boolean;
  userName: string;
}

export interface State extends fromRoot.State {
  authState: AuthState;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userName: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.authState.isAuthenticated;
