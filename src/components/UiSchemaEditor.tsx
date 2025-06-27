import Editor from '@monaco-editor/react';
import { useDesigner } from '../context/DesignerContext';

const UiSchemaEditor = () => {
  const { uiSchema, setUiSchema } = useDesigner();
  const handleChange = (value?: string) => {
    if (!value) return;
    try {
      setUiSchema(JSON.parse(value));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="json"
      value={JSON.stringify(uiSchema, null, 2)}
      onChange={handleChange}
    />
  );
};

export default UiSchemaEditor;
