import { useDesigner } from '../context/DesignerContext';
import { downloadJson } from '../utils/download';

const ImportExport = () => {
  const { schema, uiSchema, setSchema, setUiSchema } = useDesigner();

  const importFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      try {
        const json = JSON.parse(text);
        if (json.schema) setSchema(json.schema);
        if (json.uiSchema) setUiSchema(json.uiSchema);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <input type="file" accept="application/json" onChange={importFile} />
      <button onClick={() => downloadJson('schema.json', schema)}>Export Schema</button>
      <button onClick={() => downloadJson('uischema.json', uiSchema)}>Export UI</button>
    </div>
  );
};

export default ImportExport;
