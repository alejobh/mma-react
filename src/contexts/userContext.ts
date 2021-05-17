import { contextFactory } from 'config/context';
import LocalStorageService from 'services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from 'constants/general';

interface Session {
  uid: string;
}

export interface UserState {
  session?: Session;
}

export const INITIAL_STATE = {
  session: {
    uid: LocalStorageService.getValue(LOCAL_STORAGE_KEYS.uid)
  }
};

enum ActionTypes {
  SET_UID = 'SET_UID',
  REMOVE_UID = 'REMOVE_UID'
}

interface SetUid {
  type: ActionTypes.SET_UID;
  payload: string;
}

interface RemoveUid {
  type: ActionTypes.REMOVE_UID;
}

export type Action = SetUid | RemoveUid;

export const actionCreators = {
  setUid: (uid: string): SetUid => ({
    type: ActionTypes.SET_UID,
    payload: uid
  }),
  removeUid: (): RemoveUid => ({ type: ActionTypes.REMOVE_UID })
};

export const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case ActionTypes.SET_UID: {
      return { ...state, session: { uid: action.payload } };
    }
    case ActionTypes.REMOVE_UID: {
      return { ...state, session: { uid: '' } };
    }
    default: {
      return state;
    }
  }
};

export const { useSelector, Context, useDispatch } = contextFactory<UserState, Action>(INITIAL_STATE);
