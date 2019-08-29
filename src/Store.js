import React from 'react';

export const Store = React.createContext();

const initialState = {
  converted: [],
  client: null,
  paths: {
    raw: '',
    dest: ''
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'CONNECT_CLIENT':
      return { ...state, client: action.payload };
    case 'SET_RAW':
      return { ...state, paths: { ...state.paths, raw: action.payload } };
    case 'SET_DEST':
      return { ...state, paths: { ...state.paths, dest: action.payload } };
    case 'SET_OUTPUT':
      return { ...state, converted: [...state.converted, action.payload] };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
