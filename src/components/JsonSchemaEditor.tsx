import Editor from '@monaco-editor/react';
import { useDesigner } from '../context/DesignerContext';

const JsonSchemaEditor = () => {
  const { schema, setSchema } = useDesigner();
  const handleChange = (value?: string) => {
    if (!value) return;
    try {
      setSchema(JSON.parse(value));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="json"
      value={JSON.stringify(schema, null, 2)}
      onChange={handleChange}
    />
  );
};

export default JsonSchemaEditor;
