import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

import DebugVariableEditor from './var-editor';

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
  const translator = useTranslator();
  const inkVariables = listInkVariables(atrament);
  const tableData = inkVariables.map(
    (item, i) => [ item[0], <DebugVariableEditor key={i} name={item[0]} value={item[1]} />]
  );
  return(
    <Collapse title={translator.translate('debug.variables')}>
      <Table data={tableData} />
    </Collapse>
  );
};

export default DebugVariables;
