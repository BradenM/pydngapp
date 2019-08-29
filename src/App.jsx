import React from 'react';
import { Store } from './Store';

const zerorpc = require('zerorpc');
const { dialog } = require('electron').remote;

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

  const selectPathAction = async type => {
    let action = type === 'RAW' ? 'SET_RAW' : 'SET_DEST';
    let { filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    let path = filePaths[0];
    return dispatch({
      type: action,
      payload: path
    });
  };

  const convertRawAction = async () => {
    let { client, paths } = state;
    await client.invoke('convert', paths.raw, paths.dest, (err, res, more) => {
      if (res !== undefined) {
        dispatch({
          type: 'SET_OUTPUT',
          payload: res
        });
        if (!more) {
          console.log('DONE!');
          return;
        }
      }
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
        <div>
          <p>Path to Raw Images: {state.paths.raw}</p>
          <input
            onClick={() => selectPathAction('RAW')}
            type="button"
            value="Select Path"
            id="raw_path"
            name="raw_path"
          />
        </div>
        <div>
          <p>Destination: {state.paths.dest}</p>
          <input
            onClick={() => selectPathAction('DEST')}
            type="button"
            value="Select Path"
            id="dest_path"
            name="dest_path"
          />
        </div>
        <button onClick={() => convertRawAction()}>Convert</button>
        {state.converted.map(path => {
          return <p>{path}</p>;
        })}
      </div>
    </React.Fragment>
  );
}
