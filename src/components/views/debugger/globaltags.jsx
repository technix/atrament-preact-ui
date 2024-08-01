import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugGlobaltags = () => {
  const { atrament } = useAtrament();
  const globaltags = atrament.ink.getGlobalTags();
  return(
    <Collapse title="Global tags">
      <Table data={Object.entries(globaltags)} />
    </Collapse>
  );
};

export default DebugGlobaltags;
