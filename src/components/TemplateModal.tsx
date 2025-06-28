// TODO: Replace modal markup with shadcn/ui dialog components styled via
// Tailwind.
import { templates } from '../context/templates';
import { useDesigner } from '../context/DesignerContext';

// TODO: Support additional templates beyond the initial examples
// TODO: Provide a template preview so users know what they are selecting
// TODO: Group templates into categories for easier discovery

interface Props {
  open: boolean;
  onClose: () => void;
}

const TemplateModal = ({ open, onClose }: Props) => {
  const { setSchema, setUiSchema } = useDesigner();
  if (!open) return null;
  return (
    <div className="modal">
      <h2>Select Template</h2>
      <ul>
        {templates.map(t => (
          <li key={t.name}>
            <button
              onClick={() => {
                setSchema(t.schema as any);
                setUiSchema(t.uiSchema as any);
                onClose();
              }}>
              {t.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TemplateModal;
