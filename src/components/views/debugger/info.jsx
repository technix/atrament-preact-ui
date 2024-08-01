import { useAtrament } from 'src/atrament/hooks';

const DebugInfo = () => {
  const { atrament } = useAtrament();

  const inkstory = atrament.ink.story();
  const inkstate = inkstory.state;
  const gamedata = atrament.state.get().game;
  const metadata = atrament.state.get().metadata;

  return(
    <ul>
      <li>Story: {gamedata.$path}/{gamedata.$file}</li>
      <li>Metadata: {JSON.stringify(metadata)}</li>
      <li>Story seed: {inkstate.storySeed}</li>
      <li>Current turn index: {inkstate.currentTurnIndex}</li>
    </ul>
  );
};

export default DebugInfo;