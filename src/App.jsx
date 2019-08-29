import React from 'react';
import { Store } from './Store';
const zerorpc = require('zerorpc');

export default function App() {
  const { state, dispatch } = React.useContext(Store);

  const connectClientAction = async () => {
    let client = new zerorpc.Client();
    client.connect('tcp://127.0.0.1:4242');
    return dispatch({
      type: 'CONNECT_CLIENT',
      payload: client
    });
  };

  React.useEffect(() => {
    state.client === null && connectClientAction();
  });

  return (
    <React.Fragment>
      {console.log(state)}
      <div>
        <h1>PyDNGConverter</h1>
        <p>Convert some files</p>
      </div>
    </React.Fragment>
  );
}
