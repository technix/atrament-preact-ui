import { h } from 'preact';
import { useEffect, useCallback, useState } from 'preact/hooks';
import style from './index.module.css';

import Modal from 'src/components/ui/modal';
import Backdrop from 'src/components/ui/backdrop';
import CloseButton from 'src/components/ui/close-button';
import Collapse from 'src/components/ui/collapse';

import { useAtrament } from 'src/atrament/hooks';

function listInkVariables(atrament) {
  const varState = atrament.ink.story().variablesState;
  const inkVariables = [];
  for (let key of varState._globalVariables.keys()) {
    inkVariables.push([key, varState[key]]);
  }
  return inkVariables.sort((a, b) => a[0] > b[0] ? 0 : -1);
}

function listInkVisits(atrament) {
  const visitCounts = atrament.ink.story().state._visitCounts;
  const inkVisitCounts = [];
  for (let item of visitCounts) {
    inkVisitCounts.push(item);
  }
  return inkVisitCounts.sort((a, b) => a[0] > b[0] ? 0 : -1);
}


const DebuggerView = () => {
  const { atrament } = useAtrament();
  const [ isOpen, openDebugger ] = useState(false);
  const [ keyWait, setKeyWait ] = useState(false);
  const [ pathString, setPathString ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

  const toggleDebugger = useCallback(() => openDebugger(!isOpen), [ isOpen ]);

  const debugHandler = useCallback((e) => {
    if (e.keyCode === 192) {
      if (keyWait) {
        toggleDebugger();
        setKeyWait(false);
      } else {
        setKeyWait(true);
        setTimeout(() => setKeyWait(false), 1000);
      }
    }
  }, [ toggleDebugger, keyWait, setKeyWait ]);

  useEffect(() => {
    document.addEventListener("keydown", debugHandler, false);
    return () => {
      document.removeEventListener("keydown", debugHandler, false);
    }
  }, [ debugHandler ]);

  if (!isOpen) {
    return <></>;
  }
  
  const handlePathstringChange = (e) => setPathString(e.target.value);
  const goToPath = () => {
    if (pathString) {
      try {
        atrament.ink.goTo(pathString);
        atrament.game.continueStory();
      } catch (e) {
        setErrorMsg(e.toString());
      }
      setPathString('');
    }
  };

  // get variables
  const inkstory = atrament.ink.story();
  const inkstate = inkstory.state;
  const inkVariables = listInkVariables(atrament);
  const inkVisits = listInkVisits(atrament);

  return (
    <div class={style.debug_container}>
      <Backdrop onClick={toggleDebugger} />
      <Modal>
        <CloseButton onClick={toggleDebugger} />
        <ul>
          <li>Story seed: {inkstate.storySeed}</li>
          <li>Current turn index: {inkstate.currentTurnIndex}</li>
        </ul>
        <p>
          Goto: <input type="text" value={pathString} onChange={handlePathstringChange} /> <button onClick={goToPath}>Go</button> <br />
          <b>{errorMsg}</b>
        </p>

        <Collapse title="Variables">
          <table style={{border: 1}}>
            <tbody>
              {inkVariables.map((item, i) => <tr key={i}><td>{item[0]}</td><td>{JSON.stringify(item[1])}</td></tr>)}
            </tbody>
          </table>
        </Collapse>
        <Collapse title="Visits">
          <table style={{border: 1}}>
            <tbody>
              {inkVisits.map((item, i) => <tr key={i}><td>{item[0]}</td><td>{item[1]}</td></tr>)}
            </tbody>
          </table>
        </Collapse>

      </Modal>
    </div>
  );
}

export default DebuggerView;
