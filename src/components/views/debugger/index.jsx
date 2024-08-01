import { h } from 'preact';
import { useEffect, useCallback, useState } from 'preact/hooks';
import style from './index.module.css';

import Modal from 'src/components/ui/modal';
import Backdrop from 'src/components/ui/backdrop';
import CloseButton from 'src/components/ui/close-button';

import DebugInfo from './info';
import DebugGoto from './goto';
import DebugVariables from './variables';
import DebugVisits from './visits';

const DebuggerView = () => {
  const [ isOpen, openDebugger ] = useState(false);
  const [ keyWait, setKeyWait ] = useState(false);

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

  return (
    <div class={style.debug_container}>
      <Backdrop onClick={toggleDebugger} />
      <Modal>
        <CloseButton onClick={toggleDebugger} />
        <DebugInfo />
        <DebugGoto />
        <DebugVariables />
        <DebugVisits />
      </Modal>
    </div>
  );
}

export default DebuggerView;
