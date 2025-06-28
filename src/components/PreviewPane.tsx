import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useDesigner } from '../context/DesignerContext';

const PreviewPane = () => {
  const { schema, uiSchema, formData, setFormData } = useDesigner();

  const handleSubmit = () => {
    // TODO integrate more sophisticated submit handling in the final design
    console.log('Submitted form data:', formData);
  };

  return (
    <div className="preview-pane">
      <JsonForms
        schema={schema as any}
        uischema={uiSchema as any}
        data={formData}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setFormData(data)}
      />
      {/* TODO replace this button with final submit UI */}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PreviewPane;
