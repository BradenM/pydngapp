import React from 'react';

export const Store = React.createContext();

const initialState = {
  rawImages: [],
  client: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_IMAGES':
      return { ...state, rawImages: action.payload };
    case 'CONNECT_CLIENT':
      return { ...state, client: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
