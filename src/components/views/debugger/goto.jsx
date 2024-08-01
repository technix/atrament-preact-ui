import { h } from 'preact';
import style from './goto.module.css';
import { useState } from 'preact/hooks';
import { useAtrament } from 'src/atrament/hooks';

const DebugGoto = ({closeFn}) => {
  const { atrament } = useAtrament();
  const [ pathString, setPathString ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

  const handlePathstringChange = (e) => {
    setPathString(e.target.value);
    setErrorMsg('');
  };
  const goToPath = () => {
    if (pathString) {
      try {
        atrament.ink.goTo(pathString);
        atrament.game.continueStory();
        closeFn();
      } catch (e) {
        setErrorMsg(e.toString());
      }
      setPathString('');
    }
  };

  return(
    <>
      <div class={style.container}>
        <div>
        Go to path:
        </div>
        <div class={style.input_div}>
          <input class={style.input} type="text" value={pathString} onInput={handlePathstringChange} />
        </div>
        <div>
          <button class={style.button} onClick={goToPath}>Go</button> <br />
        </div>
      </div>
      <div class={style.container}>
        <span class={style.errormsg}>{errorMsg}</span>
      </div>
    </>
  );
};

export default DebugGoto;
