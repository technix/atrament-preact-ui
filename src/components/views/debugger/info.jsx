import { useAtrament } from 'src/atrament/hooks';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugInfo = () => {
  const { atrament } = useAtrament();

  const inkstory = atrament.ink.story();
  const inkstate = inkstory.state;
  const gamedata = atrament.state.get().game;
  
  const tableData = [
    ['Ink file', `${gamedata.$path}/${gamedata.$file}`],
    ['Story seed', inkstate.storySeed],
    ['Current turn index', inkstate.currentTurnIndex],
  ];

  return(
    <Collapse title="Info">
      <Table data={tableData} />
    </Collapse>
  );
};

export default DebugInfo;