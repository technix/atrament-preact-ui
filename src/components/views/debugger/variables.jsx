import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

import Collapse from 'src/components/ui/collapse';

function listInkVariables(atrament) {
  const varState = atrament.ink.story().variablesState;
  const inkVariables = [];
  for (let key of varState._globalVariables.keys()) {
    inkVariables.push([key, varState[key]]);
  }
  return inkVariables.sort((a, b) => a[0] > b[0] ? 0 : -1);
}

const DebugVariables = () => {
  const { atrament } = useAtrament();
  const inkVariables = listInkVariables(atrament);
  return(
    <Collapse title="Variables">
      <table style={{border: 1}}>
        <tbody>
          {inkVariables.map((item, i) => <tr key={i}><td>{item[0]}</td><td>{JSON.stringify(item[1])}</td></tr>)}
        </tbody>
      </table>
    </Collapse>
  );
};

export default DebugVariables;
