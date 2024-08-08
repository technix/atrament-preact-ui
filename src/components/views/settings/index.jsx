import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';

import Collapse from '../../ui/collapse';

import SettingsFullscreen from './settings-fullscreen';
import SettingsSound from './settings-sound';
import SettingsText from './settings-text';
import SettingsFont from './settings-font';
import SettingsTheme from './settings-theme';
import SettingsAnimation from './settings-animation';
import SettingsVersion from './settings-version';

import SaveAndQuit from './button-save-and-quit';

const Settings = ({ showSaveAndQuit = false }) => {
  const translator = useTranslator();
  return (
    <div class={style.settings_container}>
      <SettingsFullscreen />
      <SettingsAnimation />
      <SettingsSound />
      <Collapse title={translator.translate('settings.appearance')}>
        <SettingsFont />
        <SettingsText />
        <SettingsTheme />
      </Collapse>
      { showSaveAndQuit ? <SaveAndQuit /> : <></> }
      <SettingsVersion />
    </div>
  );
};

export default Settings;