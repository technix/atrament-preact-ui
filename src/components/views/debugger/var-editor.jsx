import { h } from 'preact';
import style from './var-editor.module.css';
import { useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';

import Toggle from 'src/components/ui/toggle';

const NumberEditor = ({name}) => {
  const { getInkVariable, setInkVariable } = useAtrament();
  const translator = useTranslator();
  const [ editMode, setEditMode ] = useState(false);
  const [ initialValue, setInitialValue ] = useState(0);
  const [ newValue, setNewValue ] = useState(0);

  useEffect(() => {
    const v = getInkVariable(name);
    setInitialValue(v);
    setNewValue(v);
  }, [ name, getInkVariable, setInitialValue, setNewValue ]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const updateValue = (e) => setNewValue(+e.target.value);

  const saveValue = () => {
    if (newValue !== initialValue) {
      setInkVariable(name, newValue);
      setInitialValue(newValue);
    }
    setEditMode(false);
  }

  const cancelEdit = () => setEditMode(false);

  return (
    editMode ?
      <>
        <button class={style.button_close} onClick={cancelEdit} title={translator.translate('debug.variables.cancel')}>X</button>
        <input class={style.input} type="number" value={newValue} onInput={updateValue} />
        <button class={style.button} onClick={saveValue} title={translator.translate('debug.variables.save')}>&gt;</button>
      </>
      :
      <a href="#" onClick={handleEdit}>{JSON.stringify(newValue)}</a>
  );
};


const StringEditor = ({name}) => {
  const { getInkVariable, setInkVariable } = useAtrament();
  const translator = useTranslator();
  const [ editMode, setEditMode ] = useState(false);
  const [ initialValue, setInitialValue ] = useState('');
  const [ newValue, setNewValue ] = useState('');

  useEffect(() => {
    const v = getInkVariable(name);
    setInitialValue(v);
    setNewValue(v);
  }, [ name, getInkVariable, setInitialValue, setNewValue ]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const updateValue = (e) => setNewValue(e.target.value);

  const saveValue = () => {
    if (newValue !== initialValue) {
      setInkVariable(name, newValue);
    }
    setEditMode(false);
  }

  const cancelEdit = () => setEditMode(false);

  return (
    editMode ?
      <>
        <button class={style.button_close} onClick={cancelEdit} title={translator.translate('debug.variables.cancel')}>X</button>
        <input class={style.input} type="text" value={newValue} onInput={updateValue} />
        <button class={style.button} onClick={saveValue} title={translator.translate('debug.variables.save')}>&gt;</button>
      </>
      :
      <a href="#" onClick={handleEdit}>{JSON.stringify(newValue)}</a>
  );
};


const BooleanEditor = ({name}) => {
  const { getInkVariable, setInkVariable } = useAtrament();
  const translator = useTranslator();
  const [ editMode, setEditMode ] = useState(false);
  const [ initialValue, setInitialValue ] = useState(false);
  const [ newValue, setNewValue ] = useState(false);

  useEffect(() => {
    const v = getInkVariable(name);
    setInitialValue(v);
    setNewValue(v);
  }, [ name, getInkVariable, setInitialValue, setNewValue ]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const updateValue = (e) => {
    console.log(e.target.checked);
    setNewValue(e.target.checked);
  }

  const saveValue = () => {
    if (newValue !== initialValue) {
      setInkVariable(name, newValue);
    }
    setEditMode(false);
  }

  const cancelEdit = () => setEditMode(false);

  return (
    editMode ?
      <>
        <button class={style.button_close} onClick={cancelEdit} title={translator.translate('debug.variables.cancel')}>X</button>
        &nbsp;<Toggle enabled={newValue} onChange={updateValue} />&nbsp;
        <button class={style.button} onClick={saveValue} title={translator.translate('debug.variables.save')}>&gt;</button>
      </>
      :
      <a href="#" onClick={handleEdit}>{JSON.stringify(newValue)}</a>
  );
};


const DebugVariableEditor = ({name, value}) => {
  const type = typeof value;
  const component = {
    number: <NumberEditor name={name} />,
    string: <StringEditor name={name} />,
    boolean: <BooleanEditor name={name} />
  }
  return component[type] || <StringEditor name={name} />;
}

export default DebugVariableEditor;
