// TODO: Replace the StatusBar markup with shadcn/ui components and Tailwind
// styling after migrating away from MUI.
import { useDesigner } from '../context/DesignerContext';
import { validate } from '../utils/validate';
import { useEffect, useState } from 'react';

const StatusBar = () => {
  const { schema, formData } = useDesigner();
  const [valid, setValid] = useState(true);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const result = validate(schema as any, formData);
    setValid(result.valid);
    setErrorCount(result.errors.length);
  }, [schema, formData]);

  return (
    <div className="status-bar">
      {valid ? '✔ Valid' : `✖ ${errorCount} errors`}
    </div>
  );
};

export default StatusBar;
