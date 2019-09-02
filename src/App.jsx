import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
      <Container fluid className="h-100" style={{ minHeight: '100%' }}>
        <Row className="h-100 justify-content-center">
          <Col
            xs={9}
            className="text-center d-flex flex-column justify-content-around"
            style={{ height: '100%' }}
          >
            <h1>PyDNG Converter</h1>
            <p>Middle Content</p>
            <p>End Content</p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
