import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { useDesigner } from '../context/DesignerContext';

const PreviewPane = () => {
  const { schema, uiSchema, formData, setFormData } = useDesigner();
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
    </div>
  );
};

export default PreviewPane;
