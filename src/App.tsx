import './App.css';
import DesignerLayout from './components/DesignerLayout';
import { DesignerProvider } from './context/DesignerContext';
import { templates } from './context/templates';

const App = () => {
  const initial = templates[0];
  return (
    <DesignerProvider initialSchema={initial.schema as any} initialUiSchema={initial.uiSchema as any}>
      <DesignerLayout />
    </DesignerProvider>
  );
};

export default App;
