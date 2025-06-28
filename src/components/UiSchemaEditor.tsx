// TODO: Style the editor container with Tailwind and use shadcn/ui wrappers
// after Material UI is removed from the project.
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

  // TODO: Register the current UI schema with Monaco's JSON language service
  // so that the editor can offer auto-completion and error hints based on the
  // schema content.

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
