import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

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
  const tableData = inkVariables.map((item) => [ item[0], JSON.stringify(item[1])]);
  return(
    <Collapse title="Variables">
      <Table data={tableData} />
    </Collapse>
  );
};

export default DebugVariables;
