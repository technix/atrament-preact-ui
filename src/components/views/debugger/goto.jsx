import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useAtrament } from 'src/atrament/hooks';

const DebugGoto = () => {
  const { atrament } = useAtrament();
  const [ pathString, setPathString ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

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

  return(
    <p>
      Goto: <input type="text" value={pathString} onChange={handlePathstringChange} /> <button onClick={goToPath}>Go</button> <br />
      <b>{errorMsg}</b>
    </p>
  );
};

export default DebugGoto;
