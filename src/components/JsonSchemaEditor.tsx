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

  // TODO: Register the current JSON schema with Monaco's JSON language service
  // so that the editor provides auto-completion and error hints based on the
  // schema definition.

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
