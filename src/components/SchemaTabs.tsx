import { useState } from 'react';
import JsonSchemaEditor from './JsonSchemaEditor';
import UiSchemaEditor from './UiSchemaEditor';

const SchemaTabs = () => {
  const [tab, setTab] = useState<'json' | 'ui'>('json');
  return (
    <div className="schema-tabs" style={{ height: '100%' }}>
      <div>
        <button onClick={() => setTab('json')}>JSON Schema</button>
        <button onClick={() => setTab('ui')}>UI Schema</button>
      </div>
      <div style={{ height: '100%' }}>{tab === 'json' ? <JsonSchemaEditor /> : <UiSchemaEditor />}</div>
    </div>
  );
};

export default SchemaTabs;
